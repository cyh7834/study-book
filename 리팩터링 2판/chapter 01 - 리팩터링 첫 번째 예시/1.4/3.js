const invoices = require("../json/invoices.json");
const play = require("../json/plays.json");

/**
 * 결과 값으로 전달되는 변수의 이름은 그 변수의 역할을 쉽게 알 수 있게
 * 'return' 으로 하는 것이 좋다.
 * 자바스크립트와 같은 동적 타입 언어를 사용할 때는 변수명을 타입이 드러나게 작성하면 도움된다.
 * 첫 번째 매개변수명을 'perf' 에서 접두어와 부정 관사를 더한 'aPerformance' 로 변경했다.
 */
function amountFor(aPerformance, play) {
    let result = 0;

    switch (play.type) {
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
            throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    return result;
}
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
        let thisAmount = amountFor(perf, play);

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