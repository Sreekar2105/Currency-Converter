const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    BWP: "BW",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
};


const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const  dropdown = document.querySelectorAll(".currency select");

const button = document.querySelector("button");
const msg = document.querySelector(".msg");

const amount = document.querySelector("input");

let fromCtry = document.querySelector(".from select");
let toCtry = document.querySelector(".to select");

window.addEventListener("load",()=>
{
  loadRate();
})

for(let select of dropdown)
{
    for(currency in countryList)
    {
        let newOpt = document.createElement("option");
        newOpt.innerText = currency;
        newOpt.value = currency;
        select.append(newOpt);
        if(select.name == "from" && currency === "USD")
        {
          newOpt.selected = "selected";      
        } 
        else if(select.name == "to" && currency === "INR")
        {
          newOpt.selected = "selected";      
        } 
    }
        select.addEventListener("change",(e)=>
        {
            flagChange(e.target);
        });
};


function flagChange(e)
{
   let ctryCode = e.value;
   let Ctry = countryList[ctryCode];
   let newSrc = `https://flagsapi.com/${Ctry}/shiny/64.png`;
   let newImg= e.parentElement.querySelector("img");
   newImg.src = newSrc;
}


button.addEventListener("click",(e)=>
{
   e.preventDefault();
   loadRate();
  
});

async function loadRate()
{
  let amountVal = amount.value;
  if(amountVal=="" || amountVal<1)
  {
    amount.value = 1;
  }
 //  console.log(fromCtry.value,toCtry.value);
  const url = `https://v6.exchangerate-api.com/v6/162e82ec4cc8a4f41f91ac3e/latest/${fromCtry.value}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data.conversion_rates);
  let exchangeRate = data.conversion_rates[toCtry.value];
  let totalAmt = amountVal * exchangeRate;
  console.log(totalAmt);
  msg.innerText = `${amountVal} ${fromCtry.value} = ${totalAmt} ${toCtry.value}`;
  console.log(msg);
}


