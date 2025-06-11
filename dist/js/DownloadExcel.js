function downloadExcel(rowData) {
    try {
        console.log('Starting downloadExcel with data:', rowData);
        
        // Parse the data from the data attribute
        const data = JSON.parse(rowData);
        console.log('Parsed data:', data);

        // Define headers
        const headers = [
            'Mã SITE/LAC', 'Tên trạm gốc', 'Mã cell', 'Địa chỉ', 'Xã (phường) đặt nhà trạm',
            'Mã phường (xã) đặt trạm', 'Huyện (quận) đặt nhà trạm', 'Mã huyện (quận) đặt trạm',
            'Tỉnh (thành phố) đặt nhà trạm', 'Mã tỉnh/ thành phố (đặt trạm)', 'Kinh độ', 'Vĩ độ',
            'Độ cao ăng-ten (m)', 'Hãng sản xuất ăng-ten', 'Chủng loại ăng-ten', 'Kiểu ăng-ten',
            'Phân cực ăng-ten', 'Tăng ích của ăng-ten (dBi)', 'Góc phương vị của ăng-ten (deg)',
            'Góc cụp của ăng-ten (deg)', 'Độ rộng búp sóng chính của ăng-ten (deg)',
            'Hãng sản xuất máy phát VTĐ', 'Chủng loại thiết bị máy phát VTĐ', 'Công suất phát (dBm)',
            'Tần số phát (MHz)', 'Băng thông (MHz)', 'Công nghệ vô tuyến', 'Ghi chú',
            'Thời gian tiếp nhận', 'Nhà cung cấp'
        ];

        // Create workbook
        const wb = XLSX.utils.book_new();

        // Create worksheet with data
        const ws = XLSX.utils.aoa_to_sheet([headers, data]);

        // Set column widths
        ws['!cols'] = headers.map(() => ({ wch: 20 }));

        // Add styles to workbook
        wb.SheetNames = ["Thông tin trạm"];
        wb.Sheets["Thông tin trạm"] = ws;

        // Add styles to header row
        const range = XLSX.utils.decode_range(ws['!ref']);
        for(let C = range.s.c; C <= range.e.c; ++C) {
            const cellRef = XLSX.utils.encode_cell({r: 0, c: C});
            if(!ws[cellRef]) continue;
            
            // Create cell with style
            ws[cellRef] = {
                v: ws[cellRef].v,
                t: 's',
                s: {
                    font: { bold: true, sz: 12, color: { rgb: "000000" } },
                    alignment: { horizontal: 'center', vertical: 'center' },
                    fill: { fgColor: { rgb: "CCCCCC" } },
                    border: {
                        top: { style: 'thin', color: { rgb: "000000" } },
                        bottom: { style: 'thin', color: { rgb: "000000" } },
                        left: { style: 'thin', color: { rgb: "000000" } },
                        right: { style: 'thin', color: { rgb: "000000" } }
                    }
                }
            };
        }

        // Write file with styles
        const wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'binary',
            cellStyles: true,
            bookSST: true,
            compression: true
        });
        
        // Convert to blob and download
        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "thong_tin_tram.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Error in downloadExcel:', error);
        alert('Có lỗi xảy ra khi tải file Excel: ' + error.message);
    }
}

// Helper function to convert string to array buffer
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}