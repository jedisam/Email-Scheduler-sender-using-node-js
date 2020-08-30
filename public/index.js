const sendRequest = async (time1, time2, method) => {
  try {
    const url = 'http://localhost:7000/student/send';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ time1, time2, method }),
    });
    alert('Done');
    console.log(res.json());
  } catch (err) {
    console.log(err);
  }
};

const btn = document.querySelector('.form-user-data');

if (btn) {
  alert('Admin Page');
  console.log('Clicked');
  btn.addEventListener('submit', e => {
    e.preventDefault();
    const time1 = document.getElementById('time1').value;
    console.log(time1);
    let time2 = '';
    if (time1 === '6') {
      time2 = '7';
    } else {
      time2 = '6';
    }
    const method = document.getElementById('method').value;
    console.log(time1, time2, method);
    sendRequest(time1, time2, method);
  });
}
