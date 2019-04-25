import {LitElement, html, css, customElement, property} from 'lit-element';

 // This decorator defines the element.
@customElement('home-page')
export class HomePage extends LitElement {
// This decorator creates a property accessor that triggers rendering and
// an observed attribute.
@property()
mood = 'great';
static styles = css`
span {
color: green;
}
.page-header{
 height:50vh;
 width:100vw;
 display:flex;
 flex-direction:column;
 justify-content:center;
 align-items:center;
 background:var(--primary-color, #eee);
 background-image:url('https://picsum.photos/2000/1000/');
 background-size:cover;

}`;
// Render element DOM by returning a `lit-html` template.
 render() {
 return html`
 <header class="page-header image-header">

 </header>
 <div class="mdc-layout-grid">
 <div class="mdc-layout-grid__inner">
   <div class="mdc-layout-grid__cell"></div>
   <div class="mdc-layout-grid__cell"></div>
   <div class="mdc-layout-grid__cell"></div>
 </div>
</div>`;
}
};