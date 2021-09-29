const invoices = require("../json/invoices.json");
const play = require("../json/plays.json");

/**
 * 추후에 결과 출력 방식을 변경하는 상황에서 statement 함수의 복잡도가 증가할 수 있고
 * 또한 statement 함수의 복사본을 생성하여 추가 기능 구현을 할 시에는 여러 함수를 관리해야하는
 * 번거로움과 위험성이 발생한다.
 */
function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("en-US",
                                {style: "currency", currency: "USD",
                                        minimumFractionDigits: 2}).format;

    for (let perf of invoice.performances) {
        const play = plays[perf.playId];
        let thisAmount = 0;

        switch (play.type) {
            case "tragedy": //비극
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${play.type}`);
        }

        //포인트를 적립한다.
        volumeCredits += Math.max(perf.audience - 30, 0);
        //희극 관객 5명마다 추가 포인트를 제공한다.
        if ("comedy" === play.type)
            volumeCredits += Math.floor(perf.audience / 5);

        //청구 내역을 출력한다.
        result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
        totalAmount += thisAmount;
    }
    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;

    return result;
}
console.log(statement(invoices, play));