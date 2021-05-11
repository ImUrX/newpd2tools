export default class t extends Map{constructor(t=[],s=[],o={}){super();const e=new Map;for(const t of s)e.set(t,t.toUpperCase());this.set("",e);for(const o of t){const t=new Map;for(const o of s)t.set(o,{value:""});this.set(o,t)}this.columnNames=new Map;for(const[t]of this)this.columnNames.set(t,t.toUpperCase());this.tableClass=o.tableClass}compare(t,s){const o=this.get(t),e=this.get(s);for(const[t,s]of o){if(!s)continue;const o=e.get(t);o.value>s.value?o.css="more":o.value<s.value&&(o.css="less"),e.set(t,o)}return this}addRows(t,[...s]){const o=this.get(t);for(const[t,e]of s)o.set(t,{value:e<0?0:e});return this}addColumns(t,[...s]){for(const[o,e]of s)this.get(o).set(t,{value:e<0?0:e});return this}toHTML(){let t=`<table${this.tableClass?` class="${this.tableClass}"`:""}>\n    <thead>\n        <tr>`;for(const[,s]of this.columnNames)t+=`\n            <td>${s}</td>`;t+="\n        </tr>\n    </thead>\n    <tbody>";for(const[s,o]of this.get("")){t+=`\n        <tr>\n            <td>${o}</td>`;for(const[o,e]of this){if(""===o)continue;const n=e.get(s);t+=`\n            <td${n.css?" class="+n.css:""}>${n.value}</td>`}t+="\n        </tr>"}return t+="\n    </tbody>\n</table>",t}translate(t={}){const s=this.get("");for(const o in t.rows)s.has(o)&&s.set(o,t.rows[o]);for(const s in t.columns)this.columnNames.has(s)&&this.columnNames.set(s,t.columns[s]);return this}}
