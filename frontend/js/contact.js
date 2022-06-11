const onSubmit = async (e) => {
  e.preventDefault();
  const res = await axios.post('/contact', {
    product: document.getElementById('contact-product').value,
    name: document.getElementById('contact-name').value,
    phone: document.getElementById('contact-phone').value,
    email: document.getElementById('contact-email').value,
    subject: document.getElementById('contact-subject').value,
    message: document.getElementById('contact-message').value,
  });

  const $div = document.createElement('div');
  if (res.data.success) {
    document.getElementById('contact-product').value = '';
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-phone').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-subject').value = '';
    document.getElementById('contact-message').value = '';

    const html = `<div class="alert alert-success alert-dismissible fade show" role="alert" style='position: fixed; top: 0; z-index: 1000; width:100%;'>
      <strong>이메일 전송완료!</strong> 문의 접수가 완료되었습니다.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`;
    $div.innerHTML = html;
    document.querySelector('body').appendChild($div);
  } else {
    const html = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style='position: fixed; top: 0; z-index: 1000; width:100%;'>
      <strong>이메일 전송실패!</strong> 문의 접수 중 오류가 발생하였습니다. 잠시 후 다시 시도하거나 전화를 통해 문의 부탁드립니다.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`;
    $div.innerHTML = html;
    document.querySelector('body').appendChild($div);
  }
};

// const $form = document.querySelector('.contact-form-area form');
// $form.addEventListener('submit', onSubmit);
