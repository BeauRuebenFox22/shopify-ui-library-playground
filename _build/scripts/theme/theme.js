document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(e) {
    let btn = e.target.closest('#load-more-products');
    if(!btn) return;
    e.preventDefault();
    let nextPage = btn.getAttribute('data-next-page');
    let grid = document.getElementById('product-grid');
    if(!nextPage || !grid) return;
    btn.disabled = true;
    btn.textContent = 'Loading...';
    let url = new URL(window.location.href);
    url.searchParams.set('page', nextPage);
    fetch(url.toString(), { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
    .then(function(response) { return response.text(); })
    .then(function(html) {
      let tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      let newGrid = tempDiv.querySelector('#product-grid');
      if(newGrid) {        
        Array.from(newGrid.children).forEach(function(item) {
          grid.appendChild(item);
        });
        // Remove duplicate product cards by handle
        let seenHandles = new Set();
        Array.from(grid.querySelectorAll('[data-product-handle]')).forEach(function(item) {
          let handle = item.getAttribute('data-product-handle');
          if(seenHandles.has(handle)) {
            item.remove();
          } else {
            seenHandles.add(handle);
          }
        });
      };
      let newBtn = tempDiv.querySelector('#load-more-products');
      if(newBtn) {
        btn.setAttribute('data-next-page', newBtn.getAttribute('data-next-page'));
        btn.disabled = false;
        btn.textContent = newBtn.textContent;
      } else {
        btn.remove();
      }
    })
    .catch(function() {
      btn.disabled = false;
      btn.textContent = 'Load more';
    });
  });
});