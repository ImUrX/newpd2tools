export default class e{constructor(e){this.charString="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,@",this.builder=e}EncodeByte(e){return this.charString.charAt(e)}DecodeByte(e){return this.charString.indexOf(e)}GetEncodedBuild(){const e=new URL(window.location.href);e.href=e.href.replace(e.search,""),e.href=e.href.replace("mobile.html",""),120!==this.builder.exp.skills.points&&e.searchParams.set("s",this.encodeSkills()),this.builder.exp.perkDeck&&e.searchParams.set("p",this.encodePerkDeck()),this.builder.exp.armor&&e.searchParams.set("a",this.encodeArmor()),this.builder.exp.throwable&&e.searchParams.set("t",this.encodeThrowable()),this.builder.exp.deployable&&e.searchParams.set("d",this.encodeDeployables());for(const[t,s]of e.searchParams)e.searchParams.set(t,this.compressData(s));return e}encodeSkills(){let e="";for(const t of document.getElementsByClassName("sk_subtree")){let s=0,r=0;const o=[...t.querySelectorAll(".sk_icon")];(this.builder.mobile?o.reverse().reverseMiddle():o).forEach(e=>{e.classList.contains("sk_selected_basic")?s|=1:e.classList.contains("sk_selected_aced")&&(r|=1),1!=e.closest(".sk_tier").dataset.tier&&(s<<=1,r<<=1)}),e+=this.EncodeByte(s)+this.EncodeByte(r)}return e}encodePerkDeck(){let e=0;for(const{classList:t}of document.getElementsByClassName("pk_deck")){if(t.contains("pk_selected"))break;e++}return this.EncodeByte(e)}encodeArmor(){let e=0;for(const{classList:t}of document.getElementsByClassName("arm_icon")){if(t.contains("arm_selected"))break;e++}return e}encodeThrowable(){let e=0;for(const{classList:t}of document.getElementsByClassName("th_icon")){if(t.contains("th_selected"))break;e++}return this.EncodeByte(e)}encodeDeployable(){let e=0;for(const{classList:t}of document.getElementsByClassName("dp_icon")){if(t.contains("dp_selected")||t.contains("dp_primary"))break;e++}return e}encodeSecondaryDeployable(){let e=0;for(const{classList:t}of document.getElementsByClassName("dp_icon")){if(t.contains("dp_secondary"))break;e++}return e}encodeDeployables(){let e=""+this.encodeDeployable();return this.builder.exp.deployableSecondary&&(e+=this.encodeSecondaryDeployable()),e}LoadBuildFromIterable(e){for(const[t,s]of e){const e=this.decompressData(s);switch(t){case"s":this.loadSkills(e);break;case"k":this.loadSkillPoints(parseInt(e));break;case"p":this.loadPerkDeck(parseInt(this.DecodeByte(e)));break;case"a":this.loadArmor(parseInt(e));break;case"t":this.loadThrowable(parseInt(this.DecodeByte(e)));break;case"d":this.loadDeployable(e)}}}loadSkills(e){for(const t of document.getElementsByClassName("sk_subtree")){let s=this.DecodeByte(e.substr(0,1)),r=this.DecodeByte(e.substr(1,1)),o=1;const a=[...t.querySelectorAll(".sk_tier")];(this.builder.mobile?a:a.reverse()).forEach(e=>[...e.querySelectorAll(".sk_icon")].reverse().forEach(e=>{let t=r&o;0!==(s&o)?e.click():0!==t&&(e.click(),e.click()),o<<=1})),e=e.substr(2)}}loadSkillPoints(e){this.builder.gui.Skill_UpdatePointsRemaining(e),this.builder.exp.skills.points=e}loadPerkDeck(e){document.querySelectorAll(".pk_deck").forEach((t,s)=>{s===e&&(t.click(),document.getElementById("tab_perk_decks_button").addEventListener("click",()=>t.scrollIntoView({block:"center"}),{once:!0}))})}loadArmor(e){document.querySelectorAll(".arm_icon").forEach((t,s)=>{s===e&&t.click()})}loadThrowable(e){document.querySelectorAll(".th_icon").forEach((t,s)=>{s===e&&t.click()})}loadDeployable(e){let t,s=String(e),r=parseInt(s.substr(0,1)),o=parseInt(s.length>1?s.substr(1,1):-1);document.querySelectorAll(".dp_icon").forEach((e,s)=>{s===parseInt(r)?e.click():s===parseInt(o)&&(t=e)}),t&&t.dispatchEvent(new MouseEvent("contextmenu"))}compressData(e){let t=1,s=e.charAt(0),r="";for(let o=1;o<e.length+1;o++){const a=e.charAt(o);a!==s?(r+=t>3?`${s}-${t}`:s.repeat(t),s=a,t=1):(t>8&&(r+=`${s}-${t}`,t=0),t++)}return r}decompressData(e){let t="";for(let s=0;s<e.length;s++)"-"!==e.charAt(s+1)?t+=e.charAt(s):(t+=e.charAt(s).repeat(parseInt(e.charAt(s+2))),s+=2);return t}HasToLoadBuild(){const e=new URLSearchParams(window.location.search);return e.has("s")||e.has("k")||e.has("p")||e.has("a")||e.has("t")||e.has("d")}}
