document.getElementById('user-view-button').addEventListener('click', function() {
    document.querySelector('.user-view').style.display = 'block';
    document.querySelector('.provider-view').style.display = 'none';
});

document.getElementById('provider-view-button').addEventListener('click', function() {
    document.querySelector('.user-view').style.display = 'none';
    document.querySelector('.provider-view').style.display = 'block';
});

document.getElementById('manager-view-button').addEventListener('click', function() {
    document.querySelector('.user-view').style.display = 'none';
    document.querySelector('.provider-view').style.display = 'none';
    document.querySelector('.manager-view').style.display = 'block';
});