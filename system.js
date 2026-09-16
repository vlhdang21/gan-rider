(function(){
  const oldM=document.getElementById('custom-spx-modal'); if(oldM)oldM.remove();
  const oldS=document.getElementById('spx-modal-style'); if(oldS)oldS.remove();

  const css="#custom-spx-modal *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}#custom-spx-modal{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);z-index:999999;display:flex;align-items:center;justify-content:center;}.spx-card{background:#fff;padding:22px 24px;border-radius:12px;width:680px;max-height:85vh;display:flex;flex-direction:column;box-shadow:0 12px 32px rgba(0,0,0,0.25);border:1px solid #e2e8f0;position:relative;}.spx-header{font-size:18px;font-weight:700;color:#1d2939;margin:0 0 16px 0;display:flex;justify-content:space-between;align-items:center;}.spx-close-btn{background:transparent;border:none;font-size:18px;color:#98a2b3;cursor:pointer;padding:4px 8px;border-radius:6px;transition:all 0.2s;line-height:1;}.spx-close-btn:hover{background:#f2f4f7;color:#1d2939;}.spx-body{overflow-y:auto;padding-right:4px;max-height:55vh;margin-bottom:12px;scroll-behavior:smooth;}.spx-batch-row{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;margin-bottom:12px;}.spx-row-title{font-size:12px;font-weight:700;color:#475467;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;display:flex;justify-content:space-between;align-items:center;}.spx-grid{display:flex;gap:12px;}.spx-col{flex:1;}.spx-label{display:block;font-size:12px;font-weight:600;color:#344054;margin-bottom:4px;}.spx-textarea{width:100%;padding:8px 10px;border:1px solid #d0d5dd;border-radius:6px;font-size:13px;outline:none;transition:all 0.2s;resize:vertical;background:#fff;}.spx-textarea:focus{border-color:#ee4d2d;box-shadow:0 0 0 3px rgba(238,77,45,0.12);}.spx-btn{display:inline-flex;align-items:center;justify-content:center;padding:8px 18px;font-size:13px;font-weight:600;border-radius:6px;border:none;cursor:pointer;transition:all 0.2s ease;}.spx-btn-add{background:#f0f5ff;color:#1677ff;border:1px dashed #91caff;width:100%;padding:9px;border-radius:8px;margin-bottom:12px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;}.spx-btn-add:hover{background:#bae0ff;border-color:#1677ff;color:#0958d9;}.spx-btn-cancel{background:#f2f4f7;color:#344054;margin-right:8px;}.spx-btn-cancel:hover{background:#d0d5dd;color:#1d2939;}.spx-btn-primary{background:#ee4d2d;color:#fff;box-shadow:0 1px 2px rgba(16,24,40,0.05);}.spx-btn-primary:hover{background:#c83a1d;box-shadow:0 4px 12px rgba(238,77,45,0.35);}.spx-btn-all{background:#027a48;color:#fff;margin-right:auto;}.spx-btn-all:hover{background:#056038;}.spx-remove-btn{background:transparent;color:#98a2b3;border:none;border-radius:4px;padding:2px 6px;cursor:pointer;font-size:12px;transition:all 0.2s;}.spx-remove-btn:hover{background:#fef3f2;color:#d92d20;}.spx-footer{display:flex;justify-content:flex-end;border-top:1px solid #f2f4f7;padding-top:14px;}";

  const sEl=document.createElement('style'); sEl.id='spx-modal-style'; sEl.innerHTML=css; document.head.appendChild(sEl);

  const modalHtml='<div id="custom-spx-modal"><div class="spx-card"><div class="spx-header"><span>Gán Rider Tự Động</span><button id="spx-x-btn" class="spx-close-btn" title="Đóng">✕</button></div><div class="spx-body" id="spx-batch-container"><div class="spx-batch-row"><div class="spx-row-title"><span>LƯỢT 1</span></div><div class="spx-grid"><div class="spx-col"><label class="spx-label">Mã PUP (Bỏ trống nếu tick Chọn Tất Cả):</label><textarea class="spx-textarea spx-pup-input" rows="3" placeholder="Dán các mã PUP..."></textarea></div><div class="spx-col"><label class="spx-label">Driver ID:</label><textarea class="spx-textarea spx-driver-input" rows="3" placeholder="Dán Driver ID..."></textarea></div></div></div></div><button id="spx-add-batch-btn" class="spx-btn-add">+ Thêm lượt gán</button><div class="spx-footer"><button id="spx-select-all-btn" class="spx-btn spx-btn-all" title="Tự động tick chọn toàn bộ các trang rồi gán Driver">⚡ Tick Tất Cả Các Trang & Gán</button><button id="spx-cancel-btn" class="spx-btn spx-btn-cancel">Hủy</button><button id="spx-start-btn" class="spx-btn spx-btn-primary">Gán theo Mã PUP</button></div></div></div>';
  document.body.insertAdjacentHTML('beforeend',modalHtml);

  function reindexBatches(){
    const rows=document.querySelectorAll('#spx-batch-container .spx-batch-row');
    rows.forEach((row,idx)=>{
      const titleSpan=row.querySelector('.spx-row-title span');
      if(titleSpan)titleSpan.innerText='LƯỢT '+(idx+1);
    });
  }

  document.getElementById('spx-add-batch-btn').onclick=()=>{
    const container=document.getElementById('spx-batch-container');
    const row=document.createElement('div');
    row.className='spx-batch-row';
    row.innerHTML='<div class="spx-row-title"><span>LƯỢT</span><button class="spx-remove-btn" title="Xóa lượt này">✕ Xóa lượt</button></div><div class="spx-grid"><div class="spx-col"><label class="spx-label">Mã PUP (Bỏ trống nếu tick Chọn Tất Cả):</label><textarea class="spx-textarea spx-pup-input" rows="3" placeholder="Dán các mã PUP..."></textarea></div><div class="spx-col"><label class="spx-label">Driver ID:</label><textarea class="spx-textarea spx-driver-input" rows="3" placeholder="Dán Driver ID..."></textarea></div></div>';
    row.querySelector('.spx-remove-btn').onclick=()=>{row.remove();reindexBatches();};
    container.appendChild(row);
    reindexBatches();
    setTimeout(()=>{container.scrollTo({top:container.scrollHeight,behavior:'smooth'});},50);
  };

  const cleanup=()=>{
    const m=document.getElementById('custom-spx-modal');
    const s=document.getElementById('spx-modal-style');
    if(m)m.remove();
    if(s)s.remove();
  };

  document.getElementById('spx-x-btn').onclick=cleanup;
  document.getElementById('spx-cancel-btn').onclick=cleanup;

  const delay=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));

  const forceClick=(el)=>{
    if(!el) return false;
    const opts={view:window, bubbles:true, cancelable:true, buttons:1};
    el.dispatchEvent(new MouseEvent('mousedown', opts));
    el.dispatchEvent(new MouseEvent('mouseup', opts));
    el.dispatchEvent(new MouseEvent('click', opts));
    return true;
  };

  const triggerInput=(el,val)=>{
    const nativeSetter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
    if(nativeSetter)nativeSetter.call(el,val);else el.value=val;
    el.dispatchEvent(new Event('input',{bubbles:true}));
    el.dispatchEvent(new Event('change',{bubbles:true}));
    el.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'a'}));
    el.dispatchEvent(new KeyboardEvent('keyup',{bubbles:true,key:'a'}));
  };

  const closeCurrentDialog=()=>{
    const cancelBtn=document.querySelector('.ssc-dialog-footer button:not(.ssc-btn-type-primary)')||document.querySelector('.ssc-dialog-header .ssc-dialog-close');
    if(cancelBtn) forceClick(cancelBtn);
  };

  async function goToPage1(){
    const pageItems=Array.from(document.querySelectorAll('ul.pager.regular-pager li.pager-item'));
    const page1Btn=pageItems.find(el=>el.innerText.trim()==='1');
    if(page1Btn && !page1Btn.classList.contains('active') && !page1Btn.classList.contains('pager-item-active')){
      forceClick(page1Btn);
      await delay(2000);
    }
  }

  async function ganchonDriver(driverId){
    let wrappers=document.querySelectorAll('.ssc-select-single-value-wrapper, .ssc-select-content, .ant-select-selector');
    let targetWrapper=wrappers[wrappers.length-1];
    if(targetWrapper) forceClick(targetWrapper);
    await delay(600);

    let inputs=document.querySelectorAll('.ssc-select-single-value-wrapper input, .ant-modal-body input, .ssc-dialog-body input, .ant-select-search input');
    let targetInput=inputs[inputs.length-1];
    if(targetInput){
      targetInput.focus();
      triggerInput(targetInput,driverId);
    }

    for(let attempt=0; attempt<6; attempt++){
      await delay(500);
      const options=Array.from(document.querySelectorAll('.ssc-options li, .ssc-options span, .ant-select-item-option-content, .ant-select-item, [role="option"]'));
      const optionToSelect=options.find(el=>{
        const text=el.getAttribute('title')||el.innerText||'';
        return text.includes('['+driverId+']')||text.includes(driverId);
      });

      if(optionToSelect){
        forceClick(optionToSelect);
        await delay(500);
        return true;
      }
    }
    return false;
  }

  async function dondepDongDriverRong(){
    const dialogRows = document.querySelectorAll('.ssc-dialog-body tbody tr, .ssc-dialog-body .ssc-table-row');
    for (let r of dialogRows) {
      if ((r.innerText || '').includes('Please Select')) {
        const trashBtn = r.querySelector('svg, button, .ssc-icon-delete, [data-icon="delete"]');
        if (trashBtn) {
          forceClick(trashBtn);
          await delay(400);
        }
      }
    }
  }

  // --- NÚT 1: TICK TẤT CẢ CÁC TRANG & GÁN DRIVER ---
  document.getElementById('spx-select-all-btn').onclick=async function(){
    let reportLogs = [];
    try {
      const rows=document.querySelectorAll('.spx-batch-row');
      let driverVal=rows[0]?.querySelector('.spx-driver-input').value || '';
      let dRvs=Array.from(new Set(driverVal.split(/[\s,\t\n]+/).map(x=>x.trim()).filter(Boolean)));

      if(dRvs.length===0){
        alert("⚠️ Vui lòng nhập Driver ID ở Lượt 1!");
        return;
      }
      cleanup();

      // Quét 4 vòng Select All
      for(let round=1; round<=4; round++){
        await goToPage1();
        let conTrangNext = true;

        while(conTrangNext){
          const headerInput = document.querySelector('thead tr th:nth-child(2) input[type="checkbox"]') ||
                              document.querySelector('#fms-container thead tr th:nth-child(2) label') ||
                              document.querySelector('.ssc-table-header label.ssc-checkbox-wrapper');
          if(headerInput){
            const inputEl = document.querySelector('thead tr th:nth-child(2) input[type="checkbox"]');
            if(!inputEl || !inputEl.checked){
              forceClick(headerInput);
              await delay(1000);
            }
          }

          const nextBtn = document.querySelector('#fms-container div.pagination-wrapper span.pager-next:not(.pager-step-disabled)') || 
                          document.querySelector('span.pager-next.pager-step:not(.pager-step-disabled)') || 
                          document.querySelector('.pager-next:not(.pager-step-disabled)');
          if(nextBtn){
            forceClick(nextBtn);
            await delay(2000);
          }else{
            conTrangNext=false;
          }
        }
      }

      await delay(1000);

      // Bấm nút Assign
      const assignBtn = document.querySelector('#fms-container div.shop-select-overview > button') || 
                        document.querySelector('.assign-driver-actions button') || 
                        document.querySelector('button.assign-btn');
                        
      if(!assignBtn || assignBtn.disabled){
        alert("❌ Đã tick chọn tất cả nhưng nút Assign không thể bấm!");
        return;
      }
      forceClick(assignBtn);
      await delay(2000);

      // Nhập Driver ID
      let driverLoi=false;
      for(let i=0;i<dRvs.length;i++){
        if(i>0){
          const addDriverBtn=document.querySelector('.add-driver')||Array.from(document.querySelectorAll('div, span, button, a')).find(el=>{
            const text=(el.innerText||'').trim();
            return text==='Add Driver'||text==='Thêm Driver';
          });
          if(!addDriverBtn){
            driverLoi=true;
            break;
          }
          forceClick(addDriverBtn);
          await delay(800);
        }

        const driverSuccess=await ganchonDriver(dRvs[i]);
        if(!driverSuccess){
          driverLoi=true;
          break;
        }
      }

      if(driverLoi){
        alert("❌ Có lỗi xảy ra khi nhập Driver ID!");
        closeCurrentDialog();
        return;
      }

      await dondepDongDriverRong();
      await delay(600);

      const confirmBtn = document.querySelector('body > div.ssc-dialog > div.ssc-dialog-wrapper > div > div.ssc-dialog-footer > span > div > button.ssc-button.ssc-btn-type-primary') || 
                         document.querySelector('.ssc-dialog-footer button.ssc-btn-type-primary') || 
                         Array.from(document.querySelectorAll('.ssc-dialog-footer button')).find(btn=>(btn.innerText||'').trim().includes('Confirm'));
                         
      if(confirmBtn){
        forceClick(confirmBtn);
        await delay(2000);
        alert(`✅ HOÀN THÀNH: Đã tick toàn bộ các trang và gán cho Driver [${dRvs.join(', ')}].`);
      }

    } catch (err) {
      alert(`💥 LỖI HỆ THỐNG: ${err.message}`);
    }
  };

  // --- NÚT 2: GÁN THEO DANH SÁCH MÃ PUP (NHƯ CŨ) ---
  document.getElementById('spx-start-btn').onclick=async function(){
    let reportLogs = [];
    try {
      const rows=document.querySelectorAll('.spx-batch-row');
      let batches=[];
      rows.forEach(r=>{
        let pupVal=r.querySelector('.spx-pup-input').value;
        let driverVal=r.querySelector('.spx-driver-input').value;
        let pUps=Array.from(new Set(pupVal.split(/[\s,\t\n]+/).map(x=>x.trim()).filter(Boolean)));
        let dRvs=Array.from(new Set(driverVal.split(/[\s,\t\n]+/).map(x=>x.trim()).filter(Boolean)));
        if(pUps.length>0&&dRvs.length>0)batches.push({pUps,dRvs});
      });

      if(batches.length===0){
        alert("⚠️ Vui lòng nhập đầy đủ mã PUP và Driver ID!");
        return;
      }
      cleanup();

      const clickCheckboxRow = (row) => {
        const inputEl = row.querySelector('input[type="checkbox"]');
        if (inputEl && inputEl.checked) return true;

        const labelEl = row.querySelector('td:nth-child(2) label') || row.querySelector('label.ssc-checkbox-wrapper') || row.querySelector('label');
        const innerSpan = row.querySelector('.ssc-checkbox-inner');

        if (labelEl) {
          labelEl.click();
        } else if (innerSpan) {
          innerSpan.click();
        } else if (inputEl) {
          forceClick(inputEl);
        }

        return inputEl ? inputEl.checked : true;
      };

      for(let b=0;b<batches.length;b++){
        let batch=batches[b];
        let danhSachMa=[...batch.pUps];
        let driverIds=[...batch.dRvs];
        let soLuongDaTich=0;
        let daHoanThanh=false;

        await goToPage1();

        for(let lan=1;lan<=4;lan++){
          if(daHoanThanh)break;
          let conTrangTiep=true;
          while(conTrangTiep){
            const currentRows=document.querySelectorAll('tbody tr');
            currentRows.forEach(row=>{
              const rowText=row.innerText;
              const foundMaIndex=danhSachMa.findIndex(ma=>rowText.includes(ma));
              if(foundMaIndex!==-1){
                const success = clickCheckboxRow(row);
                if(success){
                  soLuongDaTich++;
                }
                danhSachMa.splice(foundMaIndex,1);
              }
            });

            if(danhSachMa.length===0){
              daHoanThanh=true;
              break;
            }

            const nextBtn = document.querySelector('#fms-container div.pagination-wrapper span.pager-next:not(.pager-step-disabled)') || 
                            document.querySelector('span.pager-next.pager-step:not(.pager-step-disabled)') || 
                            document.querySelector('.pager-next:not(.pager-step-disabled)');
            if(nextBtn){
              forceClick(nextBtn);
              await delay(2000);
            }else{
              conTrangTiep=false;
            }
          }

          if(!daHoanThanh&&lan<4){
            await goToPage1();
          }
        }

        if(soLuongDaTich===0){
          reportLogs.push(`❌ Lượt ${b+1}: Thất bại - Không tìm thấy hoặc không tích được các mã PUP đã nhập.`);
          continue;
        }

        await delay(1000);

        const assignBtn = document.querySelector('#fms-container div.shop-select-overview > button') || 
                          document.querySelector('.assign-driver-actions button') || 
                          document.querySelector('button.assign-btn');
                          
        if(!assignBtn || assignBtn.disabled){
          reportLogs.push(`❌ Lượt ${b+1}: Thất bại - Đã tick PUP nhưng nút Assign không thể bấm.`);
          continue;
        }
        forceClick(assignBtn);
        await delay(2000);

        let driverLoi=false;
        for(let i=0;i<driverIds.length;i++){
          if(i>0){
            const addDriverBtn=document.querySelector('.add-driver')||Array.from(document.querySelectorAll('div, span, button, a')).find(el=>{
              const text=(el.innerText||'').trim();
              return text==='Add Driver'||text==='Thêm Driver';
            });
            if(!addDriverBtn){
              reportLogs.push(`❌ Lượt ${b+1}: Thất bại - Không tìm thấy nút 'Add Driver'.`);
              driverLoi=true;
              break;
            }
            forceClick(addDriverBtn);
            await delay(800);
          }

          const driverSuccess=await ganchonDriver(driverIds[i]);
          if(!driverSuccess){
            reportLogs.push(`❌ Lượt ${b+1}: Thất bại - Không tìm thấy Driver ID "${driverIds[i]}" trong danh sách.`);
            driverLoi=true;
            break;
          }
        }

        if(driverLoi){
          closeCurrentDialog();
          await delay(1000);
          continue;
        }

        await dondepDongDriverRong();
        await delay(600);

        const confirmBtn = document.querySelector('body > div.ssc-dialog > div.ssc-dialog-wrapper > div > div.ssc-dialog-footer > span > div > button.ssc-button.ssc-btn-type-primary') || 
                           document.querySelector('.ssc-dialog-footer button.ssc-btn-type-primary') || 
                           Array.from(document.querySelectorAll('.ssc-dialog-footer button')).find(btn=>(btn.innerText||'').trim().includes('Confirm'));
                           
        if(!confirmBtn){
          reportLogs.push(`❌ Lượt ${b+1}: Thất bại - Không tìm thấy nút Confirm.`);
          closeCurrentDialog();
          await delay(1000);
          continue;
        }

        forceClick(confirmBtn);
        await delay(3000);

        reportLogs.push(`✅ Lượt ${b+1}: Thành công - Đã gán ${soLuongDaTich} PUP cho Driver [${driverIds.join(', ')}].`);
      }

      alert("📋 BÁO CÁO TỔNG KẾT TIẾN TRÌNH GÁN RIDER:\n\n" + reportLogs.join("\n\n"));

    } catch (err) {
      alert(`💥 LỖI HỆ THỐNG KHÔNG XÁC ĐỊNH:\n${err.message}`);
    }
  };
})();
