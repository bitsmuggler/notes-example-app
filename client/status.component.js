class StatusElement extends HTMLElement {

    constructor() {
        super();
        console.log('constructor');
        window.addEventListener('offline', event => {
            this.innerHTML = `<footer class="footer mt-auto py-3" style="background-color: #FEF3CD; color: #977B2E; margin-top:auto; position: fixed; bottom: 0; width: 100%">
            <div class="container">
              <div class="row">
                <span>The app is currently offline.</span>
              </div>        
            </div>
          </footer>`;
        });

        window.addEventListener('online', event => {
             this.innerHTML = `<footer class="footer mt-auto py-3" style="background-color: #D4ECDA; color: #588E6A; margin-top:auto; position: fixed; bottom: 0; width: 100%">
            <div class="container">
              <div class="row">
                <span>The app is back online.</span>
              </div>        
            </div>
          </footer>`;
        });
    }
}

window.customElements.define('status-element', StatusElement);