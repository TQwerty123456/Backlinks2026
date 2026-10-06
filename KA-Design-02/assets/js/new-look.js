document.addEventListener('DOMContentLoaded',()=>{
  const type=document.querySelector('#cEnquiry');
  if(type&&new URLSearchParams(location.search).get('type')==='student')type.value='Student';
  document.querySelectorAll('form.form-ka').forEach(form=>{
    form.addEventListener('submit',event=>{
      event.preventDefault();
      form.classList.add('was-validated');
      if(!form.checkValidity()){form.querySelector(':invalid')?.focus();return;}
      const teacher=!!form.querySelector('#firstName');
      const fields=[...form.querySelectorAll('input,select,textarea')].filter(field=>field.type!=='file');
      const body=fields.map(field=>`${form.querySelector(`label[for="${field.id}"]`)?.textContent||field.id}: ${field.value}`).join('\n');
      const subject=teacher?'Teacher registration enquiry':`Website enquiry: ${type?.value||'General'}`;
      let note=form.querySelector('[role="status"]');
      if(!note){note=document.createElement('p');note.setAttribute('role','status');note.className='form-note mt-3';form.append(note);}
      note.textContent=teacher?'Your email app will open. Attach your CV, review the message and send it to our team.':'Your email app will open. Review and send your prepared enquiry. If it does not open, use the email link below.';
      let fallback=form.querySelector('.email-fallback');
      const url=`mailto:Karan.koli@katalentpartners.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if(!fallback){fallback=document.createElement('a');fallback.className='email-fallback text-link';form.append(fallback);}
      fallback.href=url;fallback.textContent='Open prepared email ↗';
      window.location.href=url;
    });
  });
});
