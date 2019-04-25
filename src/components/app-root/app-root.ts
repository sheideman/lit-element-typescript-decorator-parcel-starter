import {LitElement, html, css, customElement, property} from 'lit-element';
import {MDCTopAppBar} from '@material/top-app-bar/index';
import {MDCDrawer} from "@material/drawer";
import { Router } from '@vaadin/router';
import icon from '../../assets/icon/mint-leaf.svg';
const pages = {
    home: import('../home-page/home-page'),
    wppage: import('../wp-page/wp-page'),
    view404: import('../not-found/not-found')
  }

const importPage = async (name) =>{
    // Lazily load the requested page.
    //console.log(name);
    const page = await pages[name]
  return page;
  }
// This decorator defines the element.
@customElement('app-root')
export class AppRoot extends LitElement {

  // This decorator creates a property accessor that triggers rendering and
  // an observed attribute.
  @property()
  drawer: MDCDrawer;
  @property()
  settings: {
    annoucementBackgroundColor: any;
    announcementActionBackgroundColor: any;
    announcementActionLink: any;
    announcementActionText: any;
    announcementActionTextColor: any;
    announcementText: any;
    announcementTextColor: any;
    appTitle: any;
    companyAddress: any;
    companyName: any;
    facebookUrl: any;
    footerBackgroundColor: boolean;
    footerTextColor: boolean;
    gaTrackingId: any;
    gtmTrackingId: any;
    headerBackgroundColor: any;
    headerBrandingStyle: any;
    headerTextColor: any;
    icon: any;
    instagramUrl: any;
    linkColor: any;
    linkedinUrl: any;
    logo: any[];
    primaryButtonBackgroundColor: any;
    primaryButtonTextColor: any;
    primaryColor: any;
    secondaryButtonBackgroundColor: any;
    secondaryButtonTextColor: any;
    secondaryColor: any;
    showAnnouncement: boolean;
    textColor: any;
    twitterUrl: any;
    youtubeUrl: any;
};

  static styles = css`
  :host {
    display: block;

  }
  .fullsize-content-centered-panel{
    display:flex; 
    align-items:center; 
    justify-content:center; 
    width:100vw;
    height:100vh;
  }
  
  .mdc-top-app-bar{
      color:#333;
      border-bottom:1px solid #eee;
  }
  .mdc-top-app-bar__navigation-icon{
    font-size:30px;
  }
  .mdc-top-app-bar__title{
      padding:0;
      width: 100px;
      height: 100px;
      position: fixed;
      top: 10px;
      left:0;
  }
  .nav-item{
      text-decoration:none;
      color:#666;
      padding:0 1em;
      font-size:30px;
  }
  
  .icon-button{
      background:#666;
      color:#fff;
      margin:5px;
      border-radius:50%;
      width:24px;
      height:24px;
      padding:5px;
      text-align:center;
      display:flex;
      justify-content:center;
      align-items:center;
  
  }
  
  .footer-container{
    display:flex;flex:1;background: #fff;padding: 5px;
  }
  .center-flex-list{
    display:flex; 
    justify-content:center;
     align-items:center; 
     list-style-type:none; 
     width:100%;
  }
  .center-flex-item{
  padding:0 5px;
  }
  .social-nav{
    display:flex; 
    justify-content:flex-start; 
    align-items:center;
    font-size:20px;
  }
  .mdc-list-item__text{
    font-size:20px;
    font-weight:lighter;
    padding:1em;
  }
  `;
constructor(){
  super();
  this.fetchSettings();
}
  // Render element DOM by returning a `lit-html` template.
  render() {
    return html`
      <link rel="stylesheet" type="text/css"
    href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" />
    <link href="https://cdn.materialdesignicons.com/3.3.92/css/materialdesignicons.min.css" rel="stylesheet">
    <header class="mdc-top-app-bar mdc-top-app-bar--fixed" role="banner" itemscope itemtype="https://schema.org/WPHeader">
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
       
        <span class="mdc-top-app-bar__title logo"><a href="/" style="padding-left:10px;"><img style="height:100%;" src="${icon}"/></a></span>
      </section>
      <nav itemscope itemtype="https://schema.org/SiteNavigationElement" class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
      <a class=" mdc-top-app-bar__navigation-icon"><i class="mdi mdi-menu"></i></a>
  
  </nav>
    </div>
  </header>
  ${this.settings && this.settings.showAnnouncement ? html`<announcement-bar style="--announcement-text-color:${this.settings.announcementTextColor}; --announcement-bg-color:${this.settings.annoucementBackgroundColor}; --action-link-bg-color:${this.settings.announcementActionBackgroundColor}; --action-link-text-color: ${this.settings.announcementActionTextColor};" visible message="${this.settings.announcementText}" actiontext="${this.settings.announcementActionText}" actionlink="${this.settings.announcementActionLink}"></announcement-bar>`:null}
  
  <aside class="mdc-drawer mdc-drawer--dismissible mdc-top-app-bar--fixed-adjust">
      <div class="mdc-drawer__content">
        <div class="mdc-list">
          <a class="mdc-list-item mdc-list-item--activated" href="/" aria-current="page" @click="${_=>this.drawer.open = false}">
            <i class="mdi mdi-home" aria-hidden="true"></i>
            <span class="mdc-list-item__text">Home</span>
          </a>
          <a class="mdc-list-item mdc-list-item--activated" href="/about" aria-current="page"  @click="${_=>this.drawer.open = false}">
          <i class="mdi mdi-question" aria-hidden="true"></i>
            <span class="mdc-list-item__text">About</span>
          </a>
          <a class="mdc-list-item mdc-list-item--activated" href="/Contact" aria-current="page"  @click="${_=>this.drawer.open = false}">
            <i class="mdi mdi-email" aria-hidden="true"></i>
            <span class="mdc-list-item__text">Contact</span>
          </a>
        </div>
      </div>
    </aside>
  
    <div class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
    <main style="height:calc(100vh - 110px);" class="main-content" id="outlet"></main>
    </div>
    <footer style="position:fixed; bottom:0; left:0; right:0; z-index:2; border-top:1px solid #eee;">
    <div style="display:flex;flex:1;background: #fff;padding: 5px;">
    <nav itemscope itemtype="https://schema.org/SiteNavigationElement" style="display:flex; justify-content:flex-start; align-items:center">
      <a style="font-size:20px;" target="_blank" href="${this.settings ? this.settings.facebookUrl: 'https://facebook.com'}" class="secondary mdi icon-button facebook"><span class="mdi mdi-facebook"></span></a>
      <a style="font-size:20px;" target="_blank" href="${this.settings ? this.settings.linkedinUrl: 'https://linkedin.com'}" class="secondary mdi icon-button linkedin"><span class="mdi mdi-linkedin"></span></a>
      <a style="font-size:20px;" target="_blank" href="${this.settings ? this.settings.instagramUrl: 'https://instagram.com'}" class="secondary mdi icon-button instagram"><span class="mdi mdi-instagram"></span></a>
  </nav>
  ${this.clientWidth > 600  ? html`<ul style="display:flex; justify-content:center; align-items:center; list-style-type:none; width:100%;">
      <li style="padding:0 5px;">&copy; ${this.settings ? this.settings.companyName: 'Company Name'} all rights reserved.</li> | 
      <li style="padding:0 5px;"><a href="/privacy-policy">Privacy Policy</a></li> | 
      <li style="padding:0 5px;"><a href="/tos">Terms of Service</a></li>
  </ul>`:null}
  <a style="font-size:20px; width:${this.clientWidth < 600  ?'100%' : '200px'}; justify-content:${this.clientWidth > 600 ? 'center' :'flex-end'}; align-items:center; display: flex; text-decoration: none;color: #666; text-align:right;" href="tel:4806381100"><span><i class="mdi mdi-phone" style="padding-right: 5px;"></i>480.638.1100</span></a>
  <button class="mdc-button" style="--mdc-theme-primary:#555; font-size:24px;"><span><i class="mdi mdi-email"></i></span></button>
  </div>
  </footer>
  `;
  }
  firstUpdated(){
    const router = new Router(this.shadowRoot.querySelector('#outlet'));
    router.setRoutes([
        {path: '/', action: ()=>{importPage('home')}, component: 'home-page'},
        {path: '/:page', action: ()=>{importPage('wppage')}, component: 'wp-page'},
        {path: '(.*)', action: ()=>{ importPage('view404')},component: 'not-found'}
    ]);
    
    this.initMaterialWebComponents();
  }
initMaterialWebComponents(){
    const topAppBarElement = this.shadowRoot.querySelector('.mdc-top-app-bar');
    const topAppBar = new MDCTopAppBar(topAppBarElement);
    this.drawer = MDCDrawer.attachTo(this.shadowRoot.querySelector('.mdc-drawer'));
    topAppBar.listen('MDCTopAppBar:nav', () => {
        this.drawer.open = !this.drawer.open;
      });
      
}
async fetchSettings(){
  const response = await fetch('https://davis-wp-dev-sheideman.c9users.io/wp-json/davis_v2/v1/settings');
  const data = await response.json();
  if(data){
    document.documentElement.style.setProperty(`--primary-color`, data.primaryColor);
    document.documentElement.style.setProperty(`--secondary-color`, data.secondaryColor);
    document.documentElement.style.setProperty(`--link-color`, data.linkColor);
    document.documentElement.style.setProperty(`--text-color`, data.textColor);
    document.documentElement.style.setProperty(`--primary-color`, data.primaryColor);
document.documentElement.style.setProperty(`--primary-button-text-color`,data.primaryButtonTextColor);
document.documentElement.style.setProperty(`--primary-button-bg-color`,data.primaryButtonBackgroundColor);
document.documentElement.style.setProperty(`--secondary-button-text-color`,data.secondaryButtonTextColor);
document.documentElement.style.setProperty(`--secondary-button-bg-color`,data.secondaryButtonBackgroundColor);
document.documentElement.style.setProperty(`--button-bg-color`,data.primaryButtonBackgroundColor);
document.documentElement.style.setProperty(`--button-text-color`,data.primaryButtonBackgroundColor);
document.documentElement.style.setProperty(`--theme-header-bg-color`,data.headerBackgroundColor);
document.documentElement.style.setProperty(`--theme-header-text-color`,data.headerTextColor);
document.documentElement.style.setProperty(`--theme-footer-bg-color`,data.footerBackgroundColor);
document.documentElement.style.setProperty(`--theme-footer-text-color`,data.footerTextColor);
document.documentElement.style.setProperty(`--announcement-text-color`,data.announcementTextColor);
document.documentElement.style.setProperty(`--announcement-bg-color`,data.announcementTextColor);
document.documentElement.style.setProperty(` --action-link-bg-color`,data.announcementActionBackgroundColor);
document.documentElement.style.setProperty(`--action-link-text-color`,data.announcementActionTextColor);
document.documentElement.style.setProperty(`--announcement-text-color`,data.announcementTextColor);
document.documentElement.style.setProperty(`--announcement-bg-color`,data.announcementTextColor);
document.documentElement.style.setProperty(` --action-link-bg-color`,data.announcementActionBackgroundColor);
document.documentElement.style.setProperty(`--action-link-text-color`,data.announcementActionTextColor);

  }

  try{
  console.log('settings-->',data); 
  this.settings = data;
 }catch(err){
     console.log(err)
 }
}
}