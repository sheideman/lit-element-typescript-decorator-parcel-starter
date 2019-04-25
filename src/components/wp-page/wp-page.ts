import {LitElement, html, css, customElement, property} from 'lit-element';
import '../not-found/not-found';
 // This decorator defines the element.
@customElement('wp-page')
export class WPPage extends LitElement {
// This decorator creates a property accessor that triggers rendering and
// an observed attribute.
@property()
url='URL_HERE';
@property()
loading=true;
@property()
error=false;
@property()
location=null;
@property()
item = {
  author:null,
  comment_status: null,
  content: {rendered: null},
  date: null,
  date_gmt: null,
  excerpt: {rendered: null},
  featured_media: null,
  guid: {rendered: null},
  id: null,
  link: null,
  menu_order: null,
  meta: [],
  modified:null,
  modified_gmt:null,
  parent: null,
  ping_status: null,
  slug: null,
  status: null,
  template:null,
  title: {rendered: null},
  type: null,
  _embedded: {author: [], 'wp:featuredmedia': []},
  _links: {self:[], collection: [], about: [], author: [], replies:[]}
  };
static styles = css`
.page-header{
    height:50vh;
    overflow:hidden;
    position:relative;
    background:var(--primary-color, #eee);
}
not-found{
    padding:1em;
}
.page-h1 {
    position: absolute;
    font-weight: lighter;
    text-transform: uppercase;
    font-size: 40px;
    bottom: 0;
    left:0;
    padding-left: 1em;
}
.fullsize-content-centered-panel{
    display:flex; 
    align-items:center; 
    justify-content:center; 
    width:100vw;
    height:100vh;
  }
  .page-header.page-header__image{
    text-shadow: 1px 1px 3px #000;
    color:#fff;
  }
  @media(min-width: 600px){
    .page-h1 {
        font-size: 60px;
    }
  }
  @media(min-width: 800px){
    .page-h1 {
        font-size: 80px;
    }
  }`;
// Render element DOM by returning a `lit-html` template.
 render() {
     const featuredImage = this.item._embedded && this.item._embedded["wp:featuredmedia"].length > 0  ? this.item._embedded["wp:featuredmedia"][0].source_url : null;
 return html`
 <link href="https://cdn.materialdesignicons.com/3.3.92/css/materialdesignicons.min.css" rel="stylesheet"/>
<link rel="stylesheet" type="text/css"
href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" />

${this.loading && !this.error ? html`<div class="fullsize-content-centered-panel">Loading...</div>`:null}
${!this.loading && !this.error && this.item && this.item.id ? 
html`<section id=${this.item.slug} data-slug=${this.item.slug}>
${featuredImage ? html`<header class="page-header page-header__image" style="background:url('${featuredImage}') no-repeat center; "><h1 class="page-h1" .innerHTML="${this.item.title.rendered}"></h1></header>`: html`<h1 class="page-h1" .innerHTML="${this.item.title.rendered}"></h1>`}
<div>
<article .innerHTML="${this.item.content.rendered}"></article>
</div>
</section>`:null}
${this.error ? html`<not-found></not-found>`:null}
`
}
firstUpdated(){
    this.fetchPage();
   }
   async fetchPage(){
       const slug = this.location.params.page;
       console.log(slug);
   const response = await fetch(`${this.url}/wp-json/wp/v2/pages?slug=${slug}&_embed`);
   console.log(response);
 
   try{
     const data = await response.json();
     console.log(data);
     if(data.length > 0){
        this.item = data[0];
        this.loading = false;
   
     } else {
        this.error = true;
        console.log("no data, error");
     }
  
  }catch(err){
      console.log(err);
      this.error = true;
  }
 }
};