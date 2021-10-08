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
     * 총 volumeCredits 값을 계산하는 기능을 별도의 함수로 추출했다.
     */
    function totalVolumeCredits() {
        let volumeCredits = 0;
        for (let perf of invoice.performances) {
            //포인트를 적립한다.
            volumeCredits += volumeCreditsFor(perf);
        }

        return volumeCredits;
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

    let totalAmount = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    for (let perf of invoice.performances) {
        //청구 내역을 출력한다.
        result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
        totalAmount += amountFor(perf);
    }

    /*
     * totalVolumeCredits 함수가 호출될 때 추가적으로 invoice.performances에 대한 반복이 실행된다.
     * 나는 중복되어 동일한 반복문이 실행되는 것을 선호하진 않지만 이 정도의 중복은 성능에 미치는 영향이 미미할 때가 많다고 한다.
     * 또한 성능에 영향을 미친다고 하더라도 잘 다듬어진 코드는 성능 개선 작업도 훨씬 수월하기 때문에 리팩토링은 중요하다.
     * 결과적으로 더 깔끔하고 더 빠른 코드를 얻을 수 있기 때문이다.
     */
    result += `총액: ${usd(totalAmount)}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;

    return result;
}
console.log(statement(invoices, play));