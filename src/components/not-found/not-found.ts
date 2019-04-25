import {LitElement, html, css, customElement, property} from 'lit-element';

 // This decorator defines the element.
@customElement('not-found')
export class NotFound extends LitElement {
// This decorator creates a property accessor that triggers rendering and
// an observed attribute.
@property()
@property({type: String}) homeUrl = '/';
static styles = css`
:host{
    display:flex;
    height: calc(100vh - 110px);
    justify-content:center;
    align-items:center;
  }
  :host([hidden]) {
    display: none;
  }`;
// Render element DOM by returning a `lit-html` template.
 render() {
 return html`<section>
 <h2>Oops! You hit a 404</h2>
 <p>
   The page you're looking for doesn't seem to exist. Head back
   <a href="${this.homeUrl}">home</a> and try again?
 </p>
</section>`;
}
};