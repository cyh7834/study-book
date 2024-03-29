export default function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);

    return statementData;

    /**
     * performance 객체 얕은 복사 수행 함수 작성
     */
    function enrichPerformance(aPerformance) {
        const result = Object.assign({}, aPerformance); // 얕은 복사 수행
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);

        return result;
    }
    
    function playFor(aPerformance) {
        return plays[aPerformance.playId];
    }
    
    function amountFor(aPerformance) {
        let result = 0;

        switch (aPerformance.play.type) {
            case "tragedy": //비극
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
        }

        return result;
    }
    
    function volumeCreditsFor(aPerformance) {
        //포인트를 적립한다.
        let result = Math.max(aPerformance.audience - 30, 0);
        //희극 관객 5명마다 추가 포인트를 제공한다.
        if ("comedy" === aPerformance.play.type)
            result += Math.floor(aPerformance.audience / 5);

        return result;
    }

    /**
     * 기존 반복문 코드에서 reduce로 변경
     */
    function totalAmount(data) {
        return data.performances
            .reduce((total, p) => total + p.amount, 0);
    }

    /**
     * 기존 반복문 코드에서 reduce로 변경
     */
    function totalVolumeCredits(data) {
        return data.performances
            .reduce((total, p) => total + p.volumeCredits, 0);
    }
}