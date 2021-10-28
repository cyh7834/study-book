const invoices = require("../json/invoices.json");
const play = require("../json/plays.json");
import createStatementData from './createStatementData.js';

/**
 * 결과 값을 HTML로 만드는 기능을 추가해야 되는 상황이 발생했다.
 * 하지만 결과 값을 만드는 함수 내에 중첩함수들이 존재하기 때문에
 * 이 중첩 함수들을 모두 복사해서 새로운 함수를 만드는 것은 너무 비효율적이다.
 * 해결책으로 statement 함수를 쪼개어 두 단계로 나누어
 * 첫 단계에서는 statement에 필요한 데이터를 처리하고 다음 단계에서는 앞서 처리한 결과물을
 * HTML로 만드는 로직을 추가하였고, 결과 객체를 전달하는 모듈과 분리하여 별도의 파일로 생성하였다.
 */

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        {style: "currency", currency: "USD",
            minimumFractionDigits: 2}).format(aNumber / 100);
}

function renderHtml(data) {
    let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";

    for (let perf of data.performances) {
        result += `<tr><td>${perf.play.name}</td><td>($perf.audience}석)</td>`;
        result += `<td>${usd(perf.amount)}</td></tr>\n`;
    }

    result += "</table>\n";
    result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;

    return result;
}

function renderPlainText(data, plays) {
    let result = `청구 내역 (고객명: ${data.customer})\n`;

    for (let perf of data.performances) {
        //청구 내역을 출력한다.
        result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
    }

    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits}점\n`;

    return result;
}

console.log(statement(invoices, play));