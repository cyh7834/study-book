const invoices = require("../json/invoices.json");
const play = require("../json/plays.json");

/**
 * 코드 구조가 한결 나아졌다. 최상위의 statement() 함수는 이제 단 일곱 줄뿐이며,
 * 출력할 문장을 생성하는 일만 한다. 계산 로직은 모두 여러 개의 보조 함수로 빼냈다.
 * 결과적으로 각 계산 과정은 물론 전체 흐름을 이해하기가 훨씬 쉬워졌다.
 */
function statement(invoice, plays) {
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    for (let perf of invoice.performances) {
        //청구 내역을 출력한다.
        result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    }

    result += `총액: ${usd(totalAmount())}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;

    return result;

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

    /**
     * 포인트 적립 기능을 별도의 함수로 추출하였다.
     * performance의 개수만큼 반복되어 불려진다.
     */
    function volumeCreditsFor(aPerformance) {
        //포인트를 적립한다.
        let result = Math.max(aPerformance.audience - 30, 0);
        //희극 관객 5명마다 추가 포인트를 제공한다.
        if ("comedy" === playFor(aPerformance).type)
            result += Math.floor(aPerformance.audience / 5);

        return result;
    }

    /**
     * totalAmount 지역 변수를 없애고 totalAmount 값을 계산하는 기능을 별도의 함수로 추출했다.
     */
    function totalAmount() {
        let result = 0;
        for (let perf of invoice.performances) {
            result += amountFor(perf);
        }

        return result;
    }
    /**
     * 총 volumeCredits 값을 계산하는 기능을 별도의 함수로 추출했다.
     */
    function totalVolumeCredits() {
        let result = 0;
        for (let perf of invoice.performances) {
            //포인트를 적립한다.
            result += volumeCreditsFor(perf);
        }

        return result;
    }

    /**
     * 기존에 statement 함수 내에 있던 화폐 단위를 바꾸는 기능을 별도의 함수로 추출하여
     * 지역변수 'format'을 제거하였다.
     */
    function usd(aNumber) {
        return new Intl.NumberFormat("en-US",
            {style: "currency", currency: "USD",
                minimumFractionDigits: 2}).format(aNumber / 100);
    }
}
console.log(statement(invoices, play));