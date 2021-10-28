const invoices = require("../json/invoices.json");
const play = require("../json/plays.json");

/**
 * 이전 코드는 반복문을 한번 돌 때마다 공연을 조회했는데 현재 코드에서는 세 번 조회한다.
 * 하지만 성능 상 큰 영향은 없고, 지역 변수를 제거함으로써 유효범위를 신경 써야 할 대상을 줄였기 때문에
 * 추후에 리팩터링 시 함수로 추출 작업을 용이하게 했다.
 *
 * 개인적으로 아직까지는 이 방법이 좋은 방법인 것인지는 잘 모르겠다. 나는 평소에 함수 호출 시 필요한 매개변수들을
 * 4-2 처럼 특정 단어의 변수로 선언하여 해당 변수가 어떤 데이터를 저장하는지 암시적으로 표현해왔기 때문이다.
 */
function statement(invoice, plays) {
    /**
     * amountFor 함수로 불필요한 매개변수(play)를 제거하고 배열 내에서 값을 찾는 함수를 작성.
     */
    function playFor(aPerformance) {
        return plays[aPerformance.playId];
    }

    /**
     * play 매개변수를 제거하고 playFor 함수를 호출하여 play 값을 얻어온다.
     */
    function amountFor(aPerformance) {
        let result = 0;

        switch (playFor(aPerformance).type) {
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
                throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
        }

        return result;
    }

    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("en-US",
        {style: "currency", currency: "USD",
            minimumFractionDigits: 2}).format;

    for (let perf of invoice.performances) {
        //포인트를 적립한다.
        volumeCredits += Math.max(perf.audience - 30, 0);
        //희극 관객 5명마다 추가 포인트를 제공한다.
        if ("comedy" === playFor(perf).type)
            volumeCredits += Math.floor(perf.audience / 5);

        //청구 내역을 출력한다.
        result += `${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${perf.audience}석)\n`;
        totalAmount += amountFor(perf);
    }
    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;

    return result;
}
console.log(statement(invoices, play));