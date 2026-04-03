// 1. 설정 페이지에서 저장한 주소를 가져오고, 없으면 기본 주소를 씁니다.
const SHEET_CSV_URL = localStorage.getItem('goldenFarmerDB') || "https://docs.google.com/spreadsheets/d/e/2PACX-1vSXXXXXXXXX/pub?output=csv";

// 2. 구글 시트 데이터를 가져오는 함수
async function fetchSheetData() {
    try {
        const response = await fetch(SHEET_CSV_URL);
        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.error("데이터 로드 실패. 주소를 확인하세요:", error);
        return [];
    }
}

// 3. CSV를 배열로 변환
function parseCSV(csvText) {
    const rows = csvText.split('\n');
    return rows.map(row => row.split(',').map(cell => cell.trim()));
}

// 4. 돈 표시용 (예: 1000 -> 1,000원)
function formatMoney(num) {
    if(!num || isNaN(num)) return "0원";
    return new Intl.NumberFormat('ko-KR').format(num) + "원";
}
