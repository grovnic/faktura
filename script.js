var lang = 'bs';
var t = {
    bs: {
        num:'Broj',bf:'BF',date:'Datum izdavanja',delivery:'Datum isporuke',paymentDue:'Rok plaćanja',
        seller:'Prodavač',buyer:'Kupac',supplier:'Dobavljač',orderer:'Naručilac',contact:'Kontakt',
        tax:'JIB',vat:'PDV',pn:'Šifra',item:'Opis',qty:'Kol.',unit:'J.mj.',price:'Cijena',
        total:'Ukupno bez PDV',subtotal:'Ukupno bez PDV',vatAmt:'PDV',grand:'UKUPNO ZA PLAĆANJE',
        words:'Iznos slovima',notes:'Napomene',bank:'Informacije o plaćanju',footer:'',
        itemNum:'R.br.',discount:'Popust%',vatRate:'PDV%',email:'E-mail',
        electronic:'Dokument je elektronski izdat i validan bez pečata i potpisa.',signature:'Odgovorno lice',
        invoice:'FAKTURA',quote:'PONUDA',order:'NARUDŽBENICA'
    },
    en: {
        num:'Number',bf:'BF',date:'Issue date',delivery:'Delivery date',paymentDue:'Payment due',
        seller:'Seller',buyer:'Buyer',supplier:'Supplier',orderer:'Orderer',contact:'Contact',
        tax:'Tax ID',vat:'VAT',pn:'PN',item:'Description',qty:'Qty',unit:'Unit',price:'Price',
        total:'Total excl. VAT',subtotal:'Subtotal',vatAmt:'VAT',grand:'TOTAL AMOUNT DUE',
        words:'Amount in words',notes:'Notes',bank:'Payment information',footer:'',
        itemNum:'No.',discount:'Discount%',vatRate:'VAT%',email:'E-mail',
        electronic:'This document is issued electronically and is valid without seal and signature.',
        signature:'Authorized person',
        invoice:'INVOICE',quote:'QUOTE',order:'PURCHASE ORDER'
    }
};

var companyData = null;
var WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbw70D0Wn8yhFYq91ezh9m22uGTVgnqO2hnq4Y41tintsiVJhSDchwao1PSe4pL3YW39Dw/exec';

var invoiceCSS = `.invoice{background:white;padding:40px 45px;max-width:900px;margin:0 auto;box-shadow:0 0 40px rgba(0,0,0,0.1);font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif;color:#000;line-height:1.5}.invoice-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:30px;padding-bottom:18px;border-bottom:3px solid #000}.invoice-logo{max-width:560px;max-height:280px}.invoice-title{text-align:right}.invoice-title h1{font-size:36px;font-weight:700;color:#000;margin:0 0 6px 0;letter-spacing:-0.5px}.invoice-meta{font-size:14px;color:#000;margin:3px 0;font-weight:500}.invoice-parties{display:grid;grid-template-columns:1fr 1fr;gap:25px;margin:20px 0 18px 0}.party-box{padding:0}.party-label{font-size:11px;font-weight:700;color:#000;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}.party-name{font-size:16px;font-weight:700;color:#000;margin-bottom:3px}.party-details{font-size:13px;color:#000;line-height:1.6;font-weight:500}.invoice-table{width:100%;border-collapse:collapse;margin:20px 0 18px 0;table-layout:fixed}.invoice-table thead{background:#e0e0e0;border-top:3px solid #000;border-bottom:3px solid #000}.invoice-table th{padding:9px 5px;text-align:left;font-size:10px;font-weight:700;color:#000;text-transform:uppercase;letter-spacing:0.5px;writing-mode:horizontal-tb;text-orientation:mixed}.invoice-table th:nth-child(1){width:40px;text-align:center}.invoice-table th:nth-child(2){width:100px}.invoice-table th:nth-child(3){width:auto}.invoice-table th:nth-child(4){width:60px;text-align:right}.invoice-table th:nth-child(5){width:60px}.invoice-table th:nth-child(6){width:85px;text-align:right}.invoice-table th:nth-child(7){width:70px;text-align:right}.invoice-table th:nth-child(8){width:60px;text-align:right}.invoice-table th:nth-child(9){width:95px;text-align:right}.invoice-table td{padding:9px 5px;border-bottom:2px solid #ccc;font-size:13px;color:#000;font-weight:500;vertical-align:top;word-wrap:break-word;overflow-wrap:break-word;word-break:break-word;writing-mode:horizontal-tb;text-orientation:mixed;white-space:normal}.invoice-table td:nth-child(1){text-align:center}.invoice-table td:nth-child(2){}.invoice-table td:nth-child(3){word-wrap:break-word;overflow-wrap:break-word;word-break:break-word;max-width:300px;white-space:normal}.invoice-table td:nth-child(4){text-align:right}.invoice-table td:nth-child(5){}.invoice-table td:nth-child(6){text-align:right}.invoice-table td:nth-child(7){text-align:right}.invoice-table td:nth-child(8){text-align:right}.invoice-table td:nth-child(9){text-align:right}.invoice-table tbody tr:last-child td{border-bottom:3px solid #000}.invoice-table .text-right{text-align:right}.invoice-table .text-center{text-align:center}.invoice-totals{margin:15px 0 0 auto;width:350px}.total-row{display:flex;justify-content:space-between;padding:6px 0;font-size:14px;font-weight:600}.total-row.subtotal{color:#000;padding-bottom:6px}.total-row.vat{color:#000;padding-bottom:6px;border-bottom:3px solid #000}.total-row.grand{font-size:20px;font-weight:700;color:#000;padding-top:10px}.invoice-notes{margin-top:20px;padding:12px;background:#f0f0f0;border-left:5px solid #000;border-radius:4px}.invoice-notes .label{font-size:11px;font-weight:700;color:#000;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px}.invoice-notes .content{font-size:13px;color:#000;font-style:italic;font-weight:500;line-height:1.4}.payment-box{margin-top:15px;padding:12px;background:#f0f0f0;border:2px solid #000;border-radius:6px}.payment-box .label{font-size:11px;font-weight:700;color:#000;margin-bottom:5px}.payment-box .info{font-size:13px;color:#000;font-weight:600;line-height:1.4}.invoice-signature-row{display:flex;justify-content:space-between;align-items:flex-end;margin-top:40px;margin-bottom:30px}.electronic-notice{flex:1;font-size:11px;color:#666;font-style:italic;text-align:center;padding:0 20px}.signature-box{flex:1;text-align:right}.signature-line{border-bottom:2px solid #000;margin-bottom:8px;height:50px;width:200px;margin-left:auto}.signature-label{font-size:12px;font-weight:600;color:#000}.invoice-footer{margin-top:30px;padding-top:18px;border-top:2px solid #000;text-align:center;font-size:10px;color:#333;line-height:1.5;font-weight:500}@media print{body{background:white;padding:0}.invoice{box-shadow:none;padding:35px 40px}.invoice-header,.invoice-table thead,.invoice-table tbody tr:last-child td,.total-row.vat,.invoice-notes,.payment-box,.invoice-footer{-webkit-print-color-adjust:exact;print-color-adjust:exact}.invoice-table td,.invoice-table th{writing-mode:horizontal-tb!important;text-orientation:mixed!important;white-space:normal!important}}`;

function formatDateEU(iso){
    if(!iso)return'—';
    var parts=iso.split('-');
    if(parts.length!==3)return iso;
    return parts[2]+'.'+parts[1]+'.'+parts[0]+'.';
}

function addDaysToISO(iso,days){
    if(!iso)return'';
    var d=new Date(iso);
    if(isNaN(d.getTime()))return'';
    d.setDate(d.getDate()+days);
    var y=d.getFullYear();
    var m=String(d.getMonth()+1).padStart(2,'0');
    var day=String(d.getDate()).padStart(2,'0');
    return y+'-'+m+'-'+day;
}

function loadCompanyData(){
    var saved=localStorage.getItem('companyData');
    if(saved){
        companyData=JSON.parse(saved);
    }else{
        showInstructions();
    }
}

function showCompanySettings(){
    if(companyData){
        document.getElementById('companyName').value=companyData.name||'';
        document.getElementById('companyContact').value=companyData.contact||'';
        document.getElementById('companyTel').value=companyData.tel||'';
        document.getElementById('companyEmail').value=companyData.email||'';
        document.getElementById('companyAddr').value=companyData.addr||'';
        document.getElementById('companyCity').value=companyData.city||'';
        document.getElementById('companyCountry').value=companyData.country||'';
        document.getElementById('companyJIB').value=companyData.jib||'';
        document.getElementById('companyVAT').value=companyData.vat||'';
        document.getElementById('companyBank').value=companyData.bank||'';
        document.getElementById('companyFooter').value=companyData.footer||'';
        if(companyData.logo){
            document.getElementById('logoPreview').innerHTML='<img src="'+companyData.logo+'" style="max-width:200px;max-height:100px">';
        }
    }
    document.getElementById('companyModal').style.display='block';
    document.body.style.overflow='hidden';
}

function closeCompanySettings(){
    document.getElementById('companyModal').style.display='none';
    document.body.style.overflow='auto';
}

function trackCompanyRegistration(companyName,companyEmail,companyContact,companyTel){
    console.log('🔵 trackCompanyRegistration() pozvan');
    console.log('📋 Podaci:', {name: companyName, email: companyEmail, contact: companyContact, tel: companyTel});
    
    var trackedName = localStorage.getItem('trackedCompanyName');
    var trackedEmail = localStorage.getItem('trackedCompanyEmail');
    
    console.log('📦 localStorage trackedName:', trackedName);
    console.log('📦 localStorage trackedEmail:', trackedEmail);
    
    if(trackedName === companyName && trackedEmail === companyEmail){
        console.log('⚠️ Ova firma već registrovana - izlazim');
        return;
    }
    
    console.log('✅ Nova firma - šaljem request...');
    console.log('🌐 WEBHOOK_URL:', WEBHOOK_URL);
    
    var url = WEBHOOK_URL + 
        '?name=' + encodeURIComponent(companyName) + 
        '&email=' + encodeURIComponent(companyEmail) + 
        '&contact=' + encodeURIComponent(companyContact) + 
        '&tel=' + encodeURIComponent(companyTel);
    
    console.log('📤 Full URL:', url);
    
    var img = new Image();
    img.onload = function() {
        console.log('✅ Image loaded - request stigao do servera!');
        localStorage.setItem('trackedCompanyName', companyName);
        localStorage.setItem('trackedCompanyEmail', companyEmail);
        var timestamp = new Date().toISOString();
        localStorage.setItem('companyTrackedTime', timestamp);
        console.log('💾 Sačuvano u localStorage');
    };
    img.onerror = function() {
        console.log('⚠️ Image load error - ali request je možda ipak stigao');
        localStorage.setItem('trackedCompanyName', companyName);
        localStorage.setItem('trackedCompanyEmail', companyEmail);
        var timestamp = new Date().toISOString();
        localStorage.setItem('companyTrackedTime', timestamp);
        console.log('💾 Sačuvano u localStorage (nakon error)');
    };
    img.src = url;
    console.log('🖼️ Image request poslan');
}

function saveCompanySettings(){
    console.log('💾 saveCompanySettings() pozvan');
    
    var name=document.getElementById('companyName').value.trim();
    var email=document.getElementById('companyEmail').value.trim();
    
    if(!name){alert('Naziv firme je obavezan!');return;}
    if(!email){alert('E-mail je obavezan!');return;}
    
    var contact=document.getElementById('companyContact').value;
    var tel=document.getElementById('companyTel').value;
    
    companyData={
        name:name,
        contact:contact,
        tel:tel,
        email:email,
        addr:document.getElementById('companyAddr').value,
        city:document.getElementById('companyCity').value,
        country:document.getElementById('companyCountry').value,
        jib:document.getElementById('companyJIB').value,
        vat:document.getElementById('companyVAT').value,
        bank:document.getElementById('companyBank').value,
        footer:document.getElementById('companyFooter').value,
        logo:companyData&&companyData.logo?companyData.logo:''
    };
    
    localStorage.setItem('companyData',JSON.stringify(companyData));
    trackCompanyRegistration(name,email,contact,tel);
    closeCompanySettings();
    render();
    alert('✅ Podaci firme sačuvani!');
}

function previewLogo(event){
    var file=event.target.files[0];
    if(file){
        var reader=new FileReader();
        reader.onload=function(e){
            var logoBase64=e.target.result;
            if(companyData){
                companyData.logo=logoBase64;
            }else{
                companyData={logo:logoBase64};
            }
            document.getElementById('logoPreview').innerHTML='<img src="'+logoBase64+'" style="max-width:200px;max-height:100px">';
        };
        reader.readAsDataURL(file);
    }
}

function showInstructions(){
    document.getElementById('instructionsModal').style.display='block';
    document.body.style.overflow='hidden';
}

function closeInstructions(){
    document.getElementById('instructionsModal').style.display='none';
    document.body.style.overflow='auto';
    if(!companyData){
        showCompanySettings();
    }
}

window.onclick=function(event){
    if(event.target.className==='modal'){
        event.target.style.display='none';
        document.body.style.overflow='auto';
    }
};

function setTodayDates(){
    var today=new Date();
    var y=today.getFullYear();
    var m=String(today.getMonth()+1).padStart(2,'0');
    var d=String(today.getDate()).padStart(2,'0');
    var todayISO=y+'-'+m+'-'+d;
    document.getElementById('dateIssue').value=todayISO;
    document.getElementById('dateDelivery').value=todayISO;
}

function handleDocTypeChange(){
    var docType=document.getElementById('docType').value;
    var bfInput=document.getElementById('bfNum');
    if(docType==='invoice'){
        bfInput.disabled=false;
    }else{
        bfInput.disabled=true;
        bfInput.value='';
    }
    render();
}

function validateDocument(){
    var docNum=document.getElementById('docNum').value.trim();
    if(!docNum)return false;
    
    var buyerName=document.getElementById('buyerName').value.trim();
    if(!buyerName)return false;
    
    var valid=false;
    document.querySelectorAll('.item-row').forEach(function(row){
        var textarea=row.querySelector('textarea');
        var inp=row.querySelectorAll('input');
        var pn=inp[0].value.trim();
        var name=textarea.value.trim();
        var qty=parseFloat(inp[1].value)||0;
        var price=parseFloat(inp[3].value)||0;
        if(pn && name && qty>0 && price>0){valid=true;}
    });
    return valid;
}

function updateValidationInfo(isValid){
    var infoBox=document.getElementById('validationInfo');
    if(isValid){infoBox.style.display='none';}else{infoBox.style.display='flex';}
}

function validateAndRender(){
    render();
    var isValid=validateDocument();
    document.getElementById('btnSaveJSON').disabled=!isValid;
    document.getElementById('btnDownloadHTML').disabled=!isValid;
    document.getElementById('btnPrint').disabled=!isValid;
    updateValidationInfo(isValid);
}

function handleVATChange(selectElement){
    var newValue=selectElement.value;
    var oldValue=selectElement.getAttribute('data-old-value')||'17';
    if(oldValue==='17' && newValue==='0'){
        var confirmed=confirm('Da li ste sigurni da želite promijeniti PDV na 0%?');
        if(!confirmed){selectElement.value='17';return;}
    }
    selectElement.setAttribute('data-old-value',newValue);
    validateAndRender();
}

function clearDocument(){
    var confirmed=confirm('Da li ste sigurni da želite obrisati sve podatke dokumenta?\n\nOvo će resetovati formu za novi dokument.');
    if(!confirmed)return;
    
    document.getElementById('docType').value='quote';
    document.getElementById('docNum').value='';
    document.getElementById('bfNum').value='';
    document.getElementById('currency').value='KM';
    document.getElementById('buyerName').value='';
    document.getElementById('buyerAddr').value='';
    document.getElementById('buyerCity').value='';
    document.getElementById('buyerCountry').value='';
    document.getElementById('buyerJIB').value='';
    document.getElementById('buyerVAT').value='';
    document.getElementById('buyerContact').value='';
    document.getElementById('buyerTel').value='';
    document.getElementById('buyerEmail').value='';
    document.getElementById('buyerRef').value='';
    document.getElementById('paymentTerms').value='';
    document.getElementById('paymentDays').value='';
    document.getElementById('items').innerHTML='';
    
    setTodayDates();
    handleDocTypeChange();
    addItem('','',1,'kom',0,0,17);
    alert('✅ Dokument resetovan! Možete kreirati novi dokument.');
}

function addItem(pn,name,qty,unit,price,discount,vatRate){
    pn=pn||'';name=name||'';qty=qty||1;unit=unit||'kom';price=price||0;discount=discount||0;vatRate=vatRate||17;
    
    var itemCount=document.querySelectorAll('.item-row').length+1;
    var d=document.createElement('div');
    d.className='item-row';
    var txt=t[lang];
    
    d.innerHTML='<div class="item-number">'+itemCount+'</div>'+
        '<input type="text" value="'+pn+'" placeholder="'+txt.pn+'">'+
        '<textarea placeholder="'+txt.item+'">'+name+'</textarea>'+
        '<input type="number" value="'+qty+'" min="0" step="1">'+
        '<input type="text" value="'+unit+'">'+
        '<input type="number" value="'+price+'" min="0" step="0.01">'+
        '<input type="number" value="'+discount+'" min="0" max="100" step="0.01">'+
        '<select data-old-value="'+vatRate+'" onchange="handleVATChange(this)">'+
        '<option value="0" '+(vatRate==0?'selected':'')+'>0%</option>'+
        '<option value="17" '+(vatRate==17?'selected':'')+'>17%</option>'+
        '</select>'+
        '<button class="danger" onclick="this.parentElement.remove();validateAndRender()">🗑️</button>';
    
    d.querySelectorAll('input, textarea').forEach(function(el){
        el.addEventListener('input',validateAndRender);
        el.addEventListener('change',validateAndRender);
    });
    
    document.getElementById('items').appendChild(d);
    validateAndRender();
}

function changeLang(newLang){
    lang=newLang;
    document.querySelectorAll('.lang-btn').forEach(function(btn){btn.classList.remove('active');});
    document.querySelector('.lang-btn[data-lang="'+newLang+'"]').classList.add('active');
    
    var txt=t[lang];
    document.getElementById('headerItemNum').textContent=txt.itemNum;
    document.getElementById('headerPN').textContent=txt.pn;
    document.getElementById('headerItem').textContent=txt.item;
    document.getElementById('headerQty').textContent=txt.qty;
    document.getElementById('headerUnit').textContent=txt.unit;
    document.getElementById('headerPrice').textContent=txt.price;
    document.getElementById('headerDiscount').textContent=txt.discount;
    document.getElementById('headerVat').textContent=txt.vatRate;
    
    render();
}

function render(){
    var txt=t[lang];
    var rows='';
    var subtotal=0;
    var totalVat=0;
    var itemNum=0;
    var currency=document.getElementById('currency').value;
    
    document.querySelectorAll('.item-row').forEach(function(row,idx){
        itemNum=idx+1;
        row.querySelector('.item-number').textContent=itemNum;
        
        var textarea=row.querySelector('textarea');
        var inp=row.querySelectorAll('input');
        var sel=row.querySelector('select');
        
        var pn=inp[0].value;
        var name=textarea.value;
        var qty=parseFloat(inp[1].value)||0;
        var unit=inp[2].value;
        var price=parseFloat(inp[3].value)||0;
        var discount=parseFloat(inp[4].value)||0;
        var vatRate=parseInt(sel.value)||0;
        
        var lineTotal=qty*price;
        var discountAmt=lineTotal*(discount/100);
        var afterDiscount=lineTotal-discountAmt;
        var vatAmt=afterDiscount*(vatRate/100);
        
        subtotal+=afterDiscount;
        totalVat+=vatAmt;
        
        var nameDisplay=name.replace(/\n/g,'<br>');
        
        rows+='<tr>'+
            '<td class="text-center">'+itemNum+'</td>'+
            '<td>'+pn+'</td>'+
            '<td>'+nameDisplay+'</td>'+
            '<td class="text-right">'+qty+'</td>'+
            '<td>'+unit+'</td>'+
            '<td class="text-right">'+price.toFixed(2)+'</td>'+
            '<td class="text-right">'+discount.toFixed(0)+'%</td>'+
            '<td class="text-right">'+vatRate+'%</td>'+
            '<td class="text-right"><strong>'+afterDiscount.toFixed(2)+'</strong></td>'+
            '</tr>';
    });
    
    var grand=subtotal+totalVat;
    
    var docType=document.getElementById('docType').value||'quote';
    var docNum=document.getElementById('docNum').value;
    var bfNum=document.getElementById('bfNum').value;
    var dateIssue=document.getElementById('dateIssue').value;
    var dateDelivery=formatDateEU(document.getElementById('dateDelivery').value);
    var paymentDays=parseInt(document.getElementById('paymentDays').value)||0;
    var dateIssueFormatted=formatDateEU(dateIssue);
    
    var paymentDueDate='';
    if(paymentDays>0 && dateIssue){
        var dueDateISO=addDaysToISO(dateIssue,paymentDays);
        paymentDueDate=formatDateEU(dueDateISO);
    }
    
    var buyerName=document.getElementById('buyerName').value;
    var buyerAddr=document.getElementById('buyerAddr').value;
    var buyerCity=document.getElementById('buyerCity').value;
    var buyerCountry=document.getElementById('buyerCountry').value;
    var buyerJIB=document.getElementById('buyerJIB').value;
    var buyerVAT=document.getElementById('buyerVAT').value;
    var buyerContact=document.getElementById('buyerContact').value;
    var buyerTel=document.getElementById('buyerTel').value;
    var buyerEmail=document.getElementById('buyerEmail').value;
    var buyerRef=document.getElementById('buyerRef').value;
    var paymentTerms=document.getElementById('paymentTerms').value;
    
    var sellerName='';
    var sellerContact='';
    var sellerTel='';
    var sellerEmail='';
    var sellerAddr='';
    var sellerCity='';
    var sellerCountry='';
    var sellerJIB='';
    var sellerVAT='';
    var sellerLogo='';
    var footerText='';
    var bankInfo='';
    
    if(companyData){
        sellerName=companyData.name;
        sellerContact=companyData.contact;
        sellerTel=companyData.tel;
        sellerEmail=companyData.email;
        sellerAddr=companyData.addr;
        sellerCity=companyData.city;
        sellerCountry=companyData.country;
        sellerJIB=companyData.jib;
        sellerVAT=companyData.vat;
        sellerLogo=companyData.logo;
        footerText=companyData.footer;
        bankInfo=companyData.bank;
    }
    
    var docTitle=txt.invoice;
    if(docType==='quote')docTitle=txt.quote;
    if(docType==='order')docTitle=txt.order;
    
    var leftLabel=txt.seller;
    var rightLabel=txt.buyer;
    if(docType==='order'){
        leftLabel=txt.orderer;
        rightLabel=txt.supplier;
    }
    
    var html='<html><style>'+invoiceCSS+'</style>';
    html+='<div class="invoice">';
    
    html+='<div class="invoice-header">';
    if(sellerLogo){
        html+='<div><img src="'+sellerLogo+'" class="invoice-logo"></div>';
    }
    html+='<div class="invoice-title">';
    html+='<h1>'+docTitle+'</h1>';
    html+='<div class="invoice-meta">'+txt.num+': <strong>'+docNum+'</strong></div>';
    if(bfNum && docType==='invoice'){
        html+='<div class="invoice-meta">'+txt.bf+': <strong>'+bfNum+'</strong></div>';
    }
    html+='<div class="invoice-meta">'+txt.date+': <strong>'+dateIssueFormatted+'</strong></div>';
    html+='<div class="invoice-meta">'+txt.delivery+': <strong>'+dateDelivery+'</strong></div>';
    if(paymentDueDate){
        html+='<div class="invoice-meta">'+txt.paymentDue+': <strong>'+paymentDueDate+'</strong></div>';
    }
    html+='</div></div>';
    
    html+='<div class="invoice-parties">';
    
    // PRODAVAČ - novi format
    html+='<div class="party-box">';
    html+='<div class="party-label">'+leftLabel+'</div>';
    html+='<div class="party-name">'+sellerName+'</div>';
    html+='<div class="party-details">';
    
    if(sellerAddr) html+=sellerAddr+'<br>';
    if(sellerCity || sellerCountry) html+=(sellerCity?sellerCity:'')+(sellerCity && sellerCountry?', ':'')+sellerCountry+'<br>';
    
    var sellerTaxLine=[];
    if(sellerJIB) sellerTaxLine.push(txt.tax+': '+sellerJIB);
    if(sellerVAT) sellerTaxLine.push(txt.vat+': '+sellerVAT);
    if(sellerTaxLine.length>0) html+=sellerTaxLine.join(' | ')+'<br>';
    
    if(sellerContact) html+='Kontakt: '+sellerContact+'<br>';
    
    var sellerContactLine=[];
    if(sellerTel) sellerContactLine.push('Tel: '+sellerTel);
    if(sellerEmail) sellerContactLine.push(txt.email+': '+sellerEmail);
    if(sellerContactLine.length>0) html+=sellerContactLine.join('   ');
    
    html+='</div></div>';
    
    // KUPAC - novi format
    html+='<div class="party-box">';
    html+='<div class="party-label">'+rightLabel+'</div>';
    html+='<div class="party-name">'+buyerName+'</div>';
    html+='<div class="party-details">';
    
    if(buyerAddr) html+=buyerAddr+'<br>';
    if(buyerCity || buyerCountry) html+=(buyerCity?buyerCity:'')+(buyerCity && buyerCountry?', ':'')+buyerCountry+'<br>';
    
    var buyerTaxLine=[];
    if(buyerJIB) buyerTaxLine.push(txt.tax+': '+buyerJIB);
    if(buyerVAT) buyerTaxLine.push(txt.vat+': '+buyerVAT);
    if(buyerTaxLine.length>0) html+=buyerTaxLine.join(' | ')+'<br>';
    
    if(buyerContact) html+='Kontakt: '+buyerContact+'<br>';
    
    var buyerContactLine=[];
    if(buyerTel) buyerContactLine.push('Tel: '+buyerTel);
    if(buyerEmail) buyerContactLine.push(txt.email+': '+buyerEmail);
    if(buyerContactLine.length>0) html+=buyerContactLine.join('   ');
    
    if(buyerRef){
        html+='<br>Ref: '+buyerRef;
    }
    
    html+='</div></div>';
    html+='</div>';
    
    html+='<table class="invoice-table">';
    html+='<thead><tr>';
    html+='<th class="text-center">'+txt.itemNum+'</th>';
    html+='<th>'+txt.pn+'</th>';
    html+='<th>'+txt.item+'</th>';
    html+='<th class="text-right">'+txt.qty+'</th>';
    html+='<th>'+txt.unit+'</th>';
    html+='<th class="text-right">'+txt.price+'</th>';
    html+='<th class="text-right">'+txt.discount+'</th>';
    html+='<th class="text-right">'+txt.vatRate+'</th>';
    html+='<th class="text-right">'+txt.total+'</th>';
    html+='</tr></thead>';
    html+='<tbody>'+rows+'</tbody></table>';
    
    html+='<div class="invoice-totals">';
    html+='<div class="total-row subtotal"><span>'+txt.subtotal+'</span><span>'+subtotal.toFixed(2)+' '+currency+'</span></div>';
    html+='<div class="total-row vat"><span>'+txt.vatAmt+'</span><span>'+totalVat.toFixed(2)+' '+currency+'</span></div>';
    html+='<div class="total-row grand"><span>'+txt.grand+'</span><span>'+grand.toFixed(2)+' '+currency+'</span></div>';
    html+='</div>';
    
    if(paymentTerms){
        html+='<div class="invoice-notes">';
        html+='<div class="label">'+txt.notes+'</div>';
        html+='<div class="content">'+paymentTerms.replace(/\n/g,'<br>')+'</div>';
        html+='</div>';
    }
    
    if(bankInfo){
        html+='<div class="payment-box">';
        html+='<div class="label">'+txt.bank+'</div>';
        html+='<div class="info">'+bankInfo.replace(/\n/g,'<br>')+'</div>';
        html+='</div>';
    }
    
    html+='<div class="invoice-signature-row">';
    html+='<div style="flex:1"></div>';
    html+='<div class="electronic-notice">'+txt.electronic+'</div>';
    html+='<div class="signature-box">';
    html+='<div class="signature-line"></div>';
    html+='<div class="signature-label">'+txt.signature+'</div>';
    html+='</div></div>';
    
    if(footerText){
        html+='<div class="invoice-footer">'+footerText.replace(/\n/g,'<br>')+'</div>';
    }
    
    html+='</div>';
    
    document.getElementById('preview').innerHTML=html;
}

function saveJSON(){
    var data={
        lang:lang,
        docType:document.getElementById('docType').value,
        docNum:document.getElementById('docNum').value,
        bfNum:document.getElementById('bfNum').value,
        currency:document.getElementById('currency').value,
        dateIssue:document.getElementById('dateIssue').value,
        dateDelivery:document.getElementById('dateDelivery').value,
        paymentDays:document.getElementById('paymentDays').value,
        buyerName:document.getElementById('buyerName').value,
        buyerAddr:document.getElementById('buyerAddr').value,
        buyerCity:document.getElementById('buyerCity').value,
        buyerCountry:document.getElementById('buyerCountry').value,
        buyerJIB:document.getElementById('buyerJIB').value,
        buyerVAT:document.getElementById('buyerVAT').value,
        buyerContact:document.getElementById('buyerContact').value,
        buyerTel:document.getElementById('buyerTel').value,
        buyerEmail:document.getElementById('buyerEmail').value,
        buyerRef:document.getElementById('buyerRef').value,
        paymentTerms:document.getElementById('paymentTerms').value,
        items:[]
    };
    
    document.querySelectorAll('.item-row').forEach(function(row){
        var textarea=row.querySelector('textarea');
        var inp=row.querySelectorAll('input');
        var sel=row.querySelector('select');
        data.items.push({
            pn:inp[0].value,
            name:textarea.value,
            qty:inp[1].value,
            unit:inp[2].value,
            price:inp[3].value,
            discount:inp[4].value,
            vatRate:sel.value
        });
    });
    
    // Formatiranje naziva fajla: naziv kupca-tip dokumenta-ddmmyyyy-broj dokumenta
    var buyerName = data.buyerName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-') || 'Kupac';
    
    var docTypeMap = {
        'quote': 'Ponuda',
        'invoice': 'Faktura',
        'order': 'Narudzbenica'
    };
    var docTypeName = docTypeMap[data.docType] || data.docType;
    
    var dateFormatted = '';
    if(data.dateIssue){
        var parts = data.dateIssue.split('-');
        if(parts.length === 3){
            dateFormatted = parts[2] + parts[1] + parts[0]; // ddmmyyyy
        }
    }
    
    var docNum = data.docNum.replace(/[^a-zA-Z0-9]/g, '-') || 'broj';
    
    var filename = buyerName + '-' + docTypeName + '-' + dateFormatted + '-' + docNum + '.json';
    
    var json=JSON.stringify(data,null,2);
    var blob=new Blob([json],{type:'application/json'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');
    a.href=url;
    a.download=filename;
    a.click();
    URL.revokeObjectURL(url);
}


function loadJSON(event){
    var file=event.target.files[0];
    if(!file)return;
    var reader=new FileReader();
    reader.onload=function(e){
        try{
            var data=JSON.parse(e.target.result);
            lang=data.lang||'bs';
            document.getElementById('docType').value=data.docType||'quote';
            document.getElementById('docNum').value=data.docNum||'';
            document.getElementById('bfNum').value=data.bfNum||'';
            document.getElementById('currency').value=data.currency||'KM';
            document.getElementById('dateIssue').value=data.dateIssue||'';
            document.getElementById('dateDelivery').value=data.dateDelivery||'';
            document.getElementById('paymentDays').value=data.paymentDays||'';
            document.getElementById('buyerName').value=data.buyerName||'';
            document.getElementById('buyerAddr').value=data.buyerAddr||'';
            document.getElementById('buyerCity').value=data.buyerCity||'';
            document.getElementById('buyerCountry').value=data.buyerCountry||'';
            document.getElementById('buyerJIB').value=data.buyerJIB||'';
            document.getElementById('buyerVAT').value=data.buyerVAT||'';
            document.getElementById('buyerContact').value=data.buyerContact||'';
            document.getElementById('buyerTel').value=data.buyerTel||'';
            document.getElementById('buyerEmail').value=data.buyerEmail||'';
            document.getElementById('buyerRef').value=data.buyerRef||'';
            document.getElementById('paymentTerms').value=data.paymentTerms||'';
            
            document.getElementById('items').innerHTML='';
            if(data.items&&data.items.length>0){
                data.items.forEach(function(item){
                    addItem(item.pn,item.name,item.qty,item.unit,item.price,item.discount,item.vatRate);
                });
            }else{
                addItem('','',1,'kom',0,0,17);
            }
            
            handleDocTypeChange();
            changeLang(lang);
            alert('✅ Faktura učitana!');
        }catch(err){
            alert('❌ Greška pri učitavanju: '+err.message);
        }
    };
    reader.readAsText(file);
}

function downloadHTML(){
    var html='<!DOCTYPE html><html lang="'+lang+'"><head><meta charset="UTF-8"><title>Faktura - '+document.getElementById('docNum').value+'</title></head><body>'+
        document.getElementById('preview').innerHTML+
        '</body></html>';
    var blob=new Blob([html],{type:'text/html'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');
    a.href=url;
    a.download='faktura-'+document.getElementById('docNum').value+'.html';
    a.click();
    URL.revokeObjectURL(url);
}

function printToPDF(){
    window.print();
}

loadCompanyData();
setTodayDates();
addItem('','',1,'kom',0,0,17);
handleDocTypeChange();
