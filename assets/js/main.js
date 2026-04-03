// 구글 시트 웹 게시 CSV URL (본인의 URL로 교체하세요)
const SHEET_CSV_URL = "여기에_복사한_구글시트_CSV_URL을_넣으세요";

// 시트 데이터를 가져오는 공통 함수
async function fetchSheetData(sheetName) {
    try {
        // 특정 시트(탭) 데이터를 가져오기 위해 gid 파라미터가 필요할 수 있으나, 
        // 우선 전체 데이터를 가져와서 분리하는 로직을 기본으로 합니다.
        const response = await fetch(SHEET_CSV_URL);
        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.error("데이터 로드 실패:", error);
        return [];
    }
}

// CSV 파싱 함수
function parseCSV(csvText) {
    const rows = csvText.split('\n');
    return rows.map(row => row.split(',').map(cell => cell.trim()));
}

// 숫자에 콤마 찍기 (금액 표시용)
function formatMoney(num) {
    return new Intl.NumberFormat('ko-KR').format(num) + "원";
}
