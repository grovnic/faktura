var lang = 'bs';
var t = {
    bs: {num:'Broj',bf:'BF',date:'Datum izdavanja',delivery:'Datum isporuke',seller:'Prodavač',buyer:'Kupac',supplier:'Dobavljač',orderer:'Naručilac',contact:'Kontakt',tax:'JIB',vat:'PDV',item:'Opis',qty:'Kol.',unit:'J.mj.',price:'Cijena',total:'Ukupno',subtotal:'Ukupno bez PDV',vatAmt:'PDV',grand:'UKUPNO ZA PLAĆANJE',words:'Iznos slovima',terms:'Uvjeti plaćanja',bank:'Račun možete platiti na broj računa 134 105 112 002 8469, otvoren kod Asa banke.',footer:'Privredni subjekat registrovan je kod Općinskog suda u Sarajevu sa matičnim brojem 65–01–0803-25.',itemNum:'R.br.',discount:'Popust%',vatRate:'PDV%',email:'E-mail'},
    en: {num:'Number',bf:'BF',date:'Issue date',delivery:'Delivery date',seller:'Seller',buyer:'Buyer',supplier:'Supplier',orderer:'Orderer',contact:'Contact',tax:'Tax ID',vat:'VAT',item:'Description',qty:'Qty',unit:'Unit',price:'Price',total:'Total',subtotal:'Subtotal',vatAmt:'VAT',grand:'TOTAL AMOUNT DUE',words:'Amount in words',terms:'Payment terms',bank:'Payment can be made to account 134 105 112 002 8469, opened at Asa Bank.',footer:'Business entity registered with the Municipal Court in Sarajevo under registration number 65–01–0803-25.',itemNum:'No.',discount:'Discount%',vatRate:'VAT%',email:'E-mail'}
};

// FIKSNI LOGO - logo.png iz istog foldera
var logoPath = 'logo.png';

// EMBEDDED CSS ZA EXPORT
var invoiceCSS = `.invoice { 
    background: white;
    padding: 45px 50px;
    max-width: 900px;
    margin: 0 auto;
    box-shadow: 0 0 40px rgba(0,0,0,0.1);
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #000000;
    line-height: 1.6;
}
.invoice-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: flex-start;
    margin-bottom: 50px;
    padding-bottom: 30px;
    border-bottom: 3px solid #000000;
}
.invoice-logo { 
    max-width: 560px; 
    max-height: 280px; 
}
.invoice-title { text-align: right; }
.invoice-title h1 { 
    font-size: 36px; 
    font-weight: 700;
    color: #000000;
    margin: 0 0 8px 0;
    letter-spacing: -0.5px;
}
.invoice-meta { 
    font-size: 14px;
    color: #000000;
    margin: 4px 0;
    font-weight: 500;
}
.invoice-parties { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    gap: 40px;
    margin: 40px 0;
}
.party-box { padding: 0; }
.party-label { 
    font-size: 11px;
    font-weight: 700;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
}
.party-name { 
    font-size: 16px;
    font-weight: 700;
    color: #000000;
    margin-bottom: 6px;
}
.party-details { 
    font-size: 14px;
    color: #000000;
    line-height: 1.7;
    font-weight: 500;
}
.invoice-table { 
    width: 100%;
    border-collapse: collapse;
    margin: 40px 0;
}
.invoice-table thead {
    background: #e0e0e0;
    border-top: 3px solid #000000;
    border-bottom: 3px solid #000000;
}
.invoice-table th { 
    padding: 14px 8px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
.invoice-table td { 
    padding: 14px 8px;
    border-bottom: 2px solid #cccccc;
    font-size: 13px;
    color: #000000;
    font-weight: 500;
    vertical-align: top;
}
.invoice-table tbody tr:last-child td { 
    border-bottom: 3px solid #000000; 
}
.invoice-table .text-right { text-align: right; }
.invoice-table .text-center { text-align: center; }
.invoice-totals { 
    margin: 30px 0 0 auto;
    width: 350px;
}
.total-row { 
    display: flex; 
    justify-content: space-between;
    padding: 10px 0;
    font-size: 14px;
    font-weight: 600;
}
.total-row.subtotal { 
    color: #000000; 
    padding-bottom: 12px; 
}
.total-row.vat { 
    color: #000000; 
    padding-bottom: 12px; 
    border-bottom: 3px solid #000000; 
}
.total-row.grand { 
    font-size: 20px;
    font-weight: 700;
    color: #000000;
    padding-top: 18px;
}
.invoice-notes {
    margin-top: 40px;
    padding: 20px;
    background: #f0f0f0;
    border-left: 5px solid #000000;
    border-radius: 4px;
}
.invoice-notes .label {
    font-size: 11px;
    font-weight: 700;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
}
.invoice-notes .content {
    font-size: 14px;
    color: #000000;
    font-style: italic;
    font-weight: 500;
}
.payment-box {
    margin-top: 30px;
    padding: 20px;
    background: #f0f0f0;
    border: 2px solid #000000;
    border-radius: 6px;
}
.payment-box .label {
    font-size: 12px;
    font-weight: 700;
    color: #000000;
    margin-bottom: 8px;
}
.payment-box .info {
    font-size: 14px;
    color: #000000;
    font-weight: 600;
}
.invoice-footer { 
    margin-top: 60px;
    padding-top: 30px;
    border-top: 2px solid #000000;
    text-align: center;
    font-size: 11px;
    color: #333333;
    line-height: 1.8;
    font-weight: 500;
}
@media print {
    body {background: white;padding: 0;}
    .invoice {box-shadow: none;padding: 40px;}
    .invoice-header,.invoice-table thead,.invoice-table tbody tr:last-child td,.total-row.vat,.invoice-notes,.payment-box,.invoice-footer {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
}`;

function addItem(name,qty,unit,price,discount,vatRate) {
    var itemCount = document.querySelectorAll('.item-row').length + 1;
    var d = document.createElement('div');
    d.className = 'item-row';
    d.innerHTML = '<div class="item-number">'+itemCount+'</div>'+
        '<textarea placeholder="Naziv artikla" rows="2" oninput="render()">'+(name||'')+'</textarea>'+
        '<input type="number" value="'+(qty||1)+'" step="any" oninput="render()">'+
        '<input type="text" value="'+(unit||'kom')+'" oninput="render()">'+
        '<input type="number" value="'+(price||0)+'" step="0.01" oninput="render()">'+
        '<input type="number" value="'+(discount||0)+'" step="0.01" min="0" max="100" oninput="render()">'+
        '<select onchange="handleVatChange(this)">'+(vatRate==0?'<option value="17">17%</option><option value="0" selected>0%</option>':'<option value="17" selected>17%</option><option value="0">0%</option>')+'</select>'+
        '<button class="danger" onclick="this.parentElement.remove();updateItemNumbers();render()">✖</button>';
    document.getElementById('items').appendChild(d);
    render();
}

function updateItemNumbers() {
    var rows = document.querySelectorAll('.item-row');
    rows.forEach(function(row, index) {
        var numDiv = row.querySelector('.item-number');
        if(numDiv) numDiv.textContent = (index + 1);
    });
}

function handleVatChange(select) {
    if(select.value === '0') {
        if(!confirm('Da li ste sigurni da želite PDV 0%?')) {
            select.value = '17';
        }
    }
    render();
}

function render() {
    var txt = t[lang];
    var sub = 0, totalVat = 0, rows = '';
    var itemNum = 1;

    document.querySelectorAll('.item-row').forEach(function(row) {
        var numDiv = row.querySelector('.item-number');
        var textarea = row.querySelector('textarea');
        var inp = row.querySelectorAll('input');
        var sel = row.querySelector('select');

        var name = textarea.value;
        var qty = parseFloat(inp[0].value) || 0;
        var unit = inp[1].value;
        var price = parseFloat(inp[2].value) || 0;
        var discount = parseFloat(inp[3].value) || 0;
        var vatRate = parseFloat(sel.value) || 17;

        var subtotal = qty * price;
        var discountAmt = subtotal * (discount / 100);
        var afterDiscount = subtotal - discountAmt;
        var vatAmt = afterDiscount * (vatRate / 100);
        var total = afterDiscount + vatAmt;

        sub += afterDiscount;
        totalVat += vatAmt;

        var nameDisplay = name.replace(/\n/g, '<br>');

        rows += '<tr>'+
            '<td class="text-center">'+itemNum+'</td>'+
            '<td>'+nameDisplay+'</td>'+
            '<td class="text-right">'+qty+'</td>'+
            '<td>'+unit+'</td>'+
            '<td class="text-right">'+price.toFixed(2)+'</td>'+
            '<td class="text-right">'+discount.toFixed(0)+'%</td>'+
            '<td class="text-right">'+vatRate+'%</td>'+
            '<td class="text-right"><strong>'+total.toFixed(2)+'</strong></td>'+
            '</tr>';
        itemNum++;
    });

    var grand = sub + totalVat;
    var words = numToWords(grand);

    var docType = document.getElementById('docType').value;
    var bfNum = document.getElementById('bf').value;
    var docNum = document.getElementById('docNum').value;

    // LOGIKA ZA NARUDŽBENICU - OBRNUTO
    var isNarudzbenica = (docType === 'Narudžbenica');
    
    var party1Label, party2Label;
    var party1Name, party1Contact, party1Email, party1Addr, party1City, party1Country, party1JIB, party1VAT;
    var party2Name, party2Contact, party2Email, party2Addr, party2City, party2Country, party2JIB, party2VAT;

    if (isNarudzbenica) {
        // Za narudžbenicu: NextGen je Naručilac (lijevo), unosi se Dobavljač (desno)
        party1Label = txt.orderer || 'Naručilac';
        party1Name = 'NextGenSolutions d.o.o. Sarajevo';
        party1Contact = 'Nedim Fejzić';
        party1Email = 'info@nextgensolutions.ba';
        party1Addr = 'Fra Andjela Zvizdovica 1 (PC Unitic)';
        party1City = 'Sarajevo';
        party1Country = 'Bosna i Hercegovina';
        party1JIB = '4203549920007';
        party1VAT = '203549920007';

        party2Label = txt.supplier || 'Dobavljač';
        party2Name = document.getElementById('buyerName').value;
        party2Contact = document.getElementById('buyerContact').value;
        party2Email = document.getElementById('buyerEmail').value;
        party2Addr = document.getElementById('buyerAddr').value;
        party2City = document.getElementById('buyerCity').value;
        party2Country = document.getElementById('buyerCountry').value;
        party2JIB = document.getElementById('buyerJIB').value;
        party2VAT = document.getElementById('buyerVAT').value;
    } else {
        // Za fakturu/ponudu: normalna logika - Prodavač (NextGen) / Kupac
        party1Label = txt.seller;
        party1Name = document.getElementById('sellerName').value;
        party1Contact = document.getElementById('sellerContact').value;
        party1Email = document.getElementById('sellerEmail').value;
        party1Addr = document.getElementById('sellerAddr').value;
        party1City = document.getElementById('sellerCity').value;
        party1Country = document.getElementById('sellerCountry').value;
        party1JIB = document.getElementById('sellerJIB').value;
        party1VAT = document.getElementById('sellerVAT').value;

        party2Label = txt.buyer;
        party2Name = document.getElementById('buyerName').value;
        party2Contact = document.getElementById('buyerContact').value;
        party2Email = document.getElementById('buyerEmail').value;
        party2Addr = document.getElementById('buyerAddr').value;
        party2City = document.getElementById('buyerCity').value;
        party2Country = document.getElementById('buyerCountry').value;
        party2JIB = document.getElementById('buyerJIB').value;
        party2VAT = document.getElementById('buyerVAT').value;
    }

    var party1Location = '';
    if (party1City || party1Country) party1Location = (party1City||'') + (party1City&&party1Country?', ':'') + (party1Country||'');

    var party2Location = '';
    if (party2City || party2Country) party2Location = (party2City||'') + (party2City&&party2Country?', ':'') + (party2Country||'');

    var html = '<div class="invoice">'+
        '<div class="invoice-header">'+
        '<div><img class="invoice-logo" src="'+logoPath+'"></div>'+
        '<div class="invoice-title">'+
        '<h1>'+docType.toUpperCase()+'</h1>'+
        '<div class="invoice-meta">'+txt.num+': <strong>'+(docNum||'—')+'</strong></div>';

    if (docType === 'Faktura' && bfNum) {
        html += '<div class="invoice-meta">'+txt.bf+': <strong>'+bfNum+'</strong></div>';
    }

    html += '<div class="invoice-meta">'+txt.date+': '+document.getElementById('dateIssue').value+'</div>'+
        '<div class="invoice-meta">'+txt.delivery+': '+document.getElementById('dateDelivery').value+'</div>'+
        '</div></div>'+
        '<div class="invoice-parties">'+
        '<div class="party-box">'+
        '<div class="party-label">'+party1Label+'</div>'+
        '<div class="party-name">'+party1Name+'</div>'+
        '<div class="party-details">';

    if (party1Contact) {
        html += txt.contact+': '+party1Contact+'<br>';
    }
    if (party1Email) {
        html += txt.email+': '+party1Email+'<br>';
    }
    html += party1Addr+'<br>'+
        (party1Location?party1Location+'<br>':'')+
        (party1JIB?txt.tax+': '+party1JIB+'<br>':'')+
        (party1VAT?txt.vat+': '+party1VAT:'');

    html += '</div></div>'+
        '<div class="party-box">'+
        '<div class="party-label">'+party2Label+'</div>'+
        '<div class="party-name">'+(party2Name||'—')+'</div>'+
        '<div class="party-details">';

    if (party2Contact) {
        html += txt.contact+': '+party2Contact+'<br>';
    }
    if (party2Email) {
        html += txt.email+': '+party2Email+'<br>';
    }
    html += (party2Addr||'')+'<br>'+
        (party2Location?party2Location+'<br>':'')+
        (party2JIB?txt.tax+': '+party2JIB+'<br>':'')+
        (party2VAT?txt.vat+': '+party2VAT:'');

    html += '</div></div></div>'+
        '<table class="invoice-table">'+
        '<thead><tr>'+
        '<th class="text-center">'+txt.itemNum+'</th>'+
        '<th>'+txt.item+'</th>'+
        '<th class="text-right">'+txt.qty+'</th>'+
        '<th>'+txt.unit+'</th>'+
        '<th class="text-right">'+txt.price+'</th>'+
        '<th class="text-right">'+txt.discount+'</th>'+
        '<th class="text-right">'+txt.vatRate+'</th>'+
        '<th class="text-right">'+txt.total+'</th>'+
        '</tr></thead>'+
        '<tbody>'+rows+'</tbody></table>'+
        '<div class="invoice-totals">'+
        '<div class="total-row subtotal"><span>'+txt.subtotal+'</span><span>'+sub.toFixed(2)+' '+document.getElementById('curr').value+'</span></div>'+
        '<div class="total-row vat"><span>'+txt.vatAmt+'</span><span>'+totalVat.toFixed(2)+' '+document.getElementById('curr').value+'</span></div>'+
        '<div class="total-row grand"><span>'+txt.grand+'</span><span>'+grand.toFixed(2)+' '+document.getElementById('curr').value+'</span></div>'+
        '</div>'+
        '<div class="invoice-notes">'+
        '<div class="label">'+txt.words+'</div>'+
        '<div class="content">'+words+' '+document.getElementById('curr').value+'</div>'+
        '</div>';

    if (document.getElementById('payTerms').value) {
        html += '<div style="margin-top: 20px; font-size: 14px; color: #000000;">'+
            '<strong>'+txt.terms+':</strong> '+document.getElementById('payTerms').value+'</div>';
    }

    html += '<div class="payment-box">'+
        '<div class="label">Informacije o plaćanju</div>'+
        '<div class="info">'+txt.bank+'</div>'+
        '</div>'+
        '<div class="invoice-footer">'+txt.footer+'</div>'+
        '</div>';

    document.getElementById('preview').innerHTML = html;
}

function numToWords(n) {
    if(n===0)return lang==='bs'?'nula':'zero';
    var w=Math.floor(n),d=Math.round((n-w)*100),r='';
    if(lang==='bs'){
        var u=['','jedan','dva','tri','četiri','pet','šest','sedam','osam','devet'];
        var te=['','deset','dvadeset','trideset','četrdeset','pedeset','šezdeset','sedamdeset','osamdeset','devedeset'];
        var tn=['deset','jedanaest','dvanaest','trinaest','četrnaest','petnaest','šesnaest','sedamnaest','osamnaest','devetnaest'];
        var h=['','sto','dvjesto','tristo','četiristo','petsto','šeststo','sedamsto','osamsto','devetsto'];
        if(w>=1000){var k=Math.floor(w/1000);r+=(k===1?'jedna hiljada ':u[k]+' hiljade ');w%=1000;}
        if(w>=100){r+=h[Math.floor(w/100)]+' ';w%=100;}
        if(w>=20){r+=te[Math.floor(w/10)]+' ';w%=10;}
        else if(w>=10){r+=tn[w-10]+' ';w=0;}
        if(w>0)r+=u[w]+' ';
        if(d>0)r+='i '+d+'/100';
    }else{
        var ue=['','one','two','three','four','five','six','seven','eight','nine'];
        var tee=['','ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
        var tne=['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
        if(w>=1000){var ke=Math.floor(w/1000);r+=ue[ke]+' thousand ';w%=1000;}
        if(w>=100){r+=ue[Math.floor(w/100)]+' hundred ';w%=100;}
        if(w>=20){r+=tee[Math.floor(w/10)]+' ';w%=10;}
        else if(w>=10){r+=tne[w-10]+' ';w=0;}
        if(w>0)r+=ue[w]+' ';
        if(d>0)r+='and '+d+'/100';
    }
    return r.trim();
}

function downloadHTML() {
    var docNum = document.getElementById('docNum').value.trim();
    if(!docNum) {
        alert('❌ GREŠKA: Broj dokumenta mora biti popunjen prije eksporta!');
        document.getElementById('docNum').focus();
        return;
    }

    var docType = document.getElementById('docType').value;
    var content = document.getElementById('preview').innerHTML;

    var full = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>'+
        docType+' '+docNum+
        '</title><style>body{margin:0;padding:40px;background:#f5f5f5;}'+invoiceCSS+'</style></head><body>'+
        content+'</body></html>';

    var b = new Blob([full], {type:'text/html'});
    var u = URL.createObjectURL(b);
    var a = document.createElement('a');
    a.href = u;
    a.download = docType+'_'+docNum.replace(/\//g,'_')+'.html';
    a.click();
    URL.revokeObjectURL(u);
    alert('✅ HTML preuzet!');
}

function saveJSON() {
    var items = [];
    document.querySelectorAll('.item-row').forEach(function(row) {
        var textarea = row.querySelector('textarea');
        var inp = row.querySelectorAll('input');
        var sel = row.querySelector('select');
        items.push({
            name:textarea.value,
            qty:parseFloat(inp[0].value),
            unit:inp[1].value,
            price:parseFloat(inp[2].value),
            discount:parseFloat(inp[3].value),
            vatRate:parseFloat(sel.value)
        });
    });
    
    var data = {
        lang:lang,type:document.getElementById('docType').value,num:document.getElementById('docNum').value,
        bf:document.getElementById('bf').value,dateIssue:document.getElementById('dateIssue').value,
        dateDelivery:document.getElementById('dateDelivery').value,place:document.getElementById('place').value,
        terms:document.getElementById('payTerms').value,curr:document.getElementById('curr').value,
        seller:{name:document.getElementById('sellerName').value,contact:document.getElementById('sellerContact').value,
        email:document.getElementById('sellerEmail').value,addr:document.getElementById('sellerAddr').value,
        city:document.getElementById('sellerCity').value,country:document.getElementById('sellerCountry').value,
        jib:document.getElementById('sellerJIB').value,vat:document.getElementById('sellerVAT').value},
        buyer:{name:document.getElementById('buyerName').value,contact:document.getElementById('buyerContact').value,
        email:document.getElementById('buyerEmail').value,addr:document.getElementById('buyerAddr').value,
        city:document.getElementById('buyerCity').value,country:document.getElementById('buyerCountry').value,
        jib:document.getElementById('buyerJIB').value,vat:document.getElementById('buyerVAT').value},
        items:items
    };
    
    // FORMATIRANJE IMENA FAJLA: NazivKupca(10 char)fakt/pon/narDDMMYYYY-brojdokumenta
    var buyerName = document.getElementById('buyerName').value || 'DRAFT';
    var docType = document.getElementById('docType').value;
    
    // Odredi prefiks prema tipu dokumenta
    var docPrefix = '';
    if (docType === 'Faktura') {
        docPrefix = 'fakt';
    } else if (docType === 'Ponuda') {
        docPrefix = 'pon';
    } else if (docType === 'Narudžbenica') {
        docPrefix = 'nar';
    }
    
    // Uzmi prvih 10 karaktera naziva kupca, ukloni razmake i specijalne znakove
    var buyerShort = buyerName
        .replace(/[^a-zA-Z0-9\u0080-\uFFFF]/g, '') // Ukloni sve osim slova i brojeva (uključujući ćčšđž)
        .substring(0, 10);
    
    // Formatiraj datum iz dateIssue (YYYY-MM-DD) u DDMMYYYY
    var dateIssue = document.getElementById('dateIssue').value;
    var dateParts = dateIssue.split('-');
    var dateFormatted = dateParts[2] + dateParts[1] + dateParts[0]; // DDMMYYYY
    
    // Broj dokumenta
    var docNum = data.num || 'DRAFT';
    var docNumClean = docNum.replace(/\//g, '-');
    
    // Konačno ime: NazivKupca(10)fakt/pon/narDDMMYYYY-brojdokumenta.json
    var filename = buyerShort + docPrefix + dateFormatted + '-' + docNumClean + '.json';
    
    var b = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
    var u = URL.createObjectURL(b);
    var a = document.createElement('a');
    a.href = u;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(u);
    
    alert('✅ JSON sačuvan: ' + filename);
}

function loadJSON(e) {
    var f = e.target.files[0];
    if(!f) return;
    var r = new FileReader();
    r.onload = function(ev) {
        try {
            var d = JSON.parse(ev.target.result);
            lang = d.lang||'bs';
            document.getElementById('lang').value = lang;
            document.getElementById('docType').value = d.type||'Faktura';
            document.getElementById('docNum').value = d.num||'';
            document.getElementById('bf').value = d.bf||'';
            document.getElementById('dateIssue').value = d.dateIssue||'';
            document.getElementById('dateDelivery').value = d.dateDelivery||'';
            document.getElementById('place').value = d.place||'Sarajevo';
            document.getElementById('payTerms').value = d.terms||'';
            document.getElementById('curr').value = d.curr||'KM';

            if(d.seller) {
                document.getElementById('sellerName').value = d.seller.name||'NextGenSolutions d.o.o. Sarajevo';
                document.getElementById('sellerContact').value = d.seller.contact||'Nedim Fejzić';
                document.getElementById('sellerEmail').value = d.seller.email||'info@nextgensolutions.ba';
                document.getElementById('sellerAddr').value = d.seller.addr||'Fra Andjela Zvizdovica 1 (PC Unitic)';
                document.getElementById('sellerCity').value = d.seller.city||'Sarajevo';
                document.getElementById('sellerCountry').value = d.seller.country||'Bosna i Hercegovina';
                document.getElementById('sellerJIB').value = d.seller.jib||'4203549920007';
                document.getElementById('sellerVAT').value = d.seller.vat||'203549920007';
            }

            document.getElementById('buyerName').value = d.buyer.name||'';
            document.getElementById('buyerContact').value = d.buyer.contact||'';
            document.getElementById('buyerEmail').value = d.buyer.email||'';
            document.getElementById('buyerAddr').value = d.buyer.addr||'';
            document.getElementById('buyerCity').value = d.buyer.city||'';
            document.getElementById('buyerCountry').value = d.buyer.country||'';
            document.getElementById('buyerJIB').value = d.buyer.jib||'';
            document.getElementById('buyerVAT').value = d.buyer.vat||'';

            document.getElementById('items').innerHTML = '';
            if(d.items && d.items.length>0) {
                d.items.forEach(function(it) { 
                    addItem(it.name,it.qty,it.unit,it.price,it.discount||0,it.vatRate||17); 
                });
            } else {
                addItem();
            }
            alert('✅ Učitano!');
        } catch(err) {
            alert('❌ Greška: '+err.message);
        }
    };
    r.readAsText(f);
}

function resetForm() {
    if(confirm('Novi dokument?')) {
        ['buyerName','buyerContact','buyerEmail','buyerAddr','buyerCity','buyerCountry','buyerJIB','buyerVAT','payTerms','bf','docNum'].forEach(function(id) {
            document.getElementById(id).value = '';
        });
        document.getElementById('items').innerHTML = '';
        addItem();
    }
}

function changeLang() {
    lang = document.getElementById('lang').value;
    render();
}

// INICIJALIZACIJA - DODAJ PRVU STAVKU
addItem();
render();
