import{join as e}from"path";import{readdirSync as r,statSync as i}from"fs";export const dirSize=(t,n)=>{let o=r(t,{withFileTypes:!0}),f=o.map(r=>{let o=e(t,r.name);if(n?.includes(r.name))return 0;if(r.isDirectory())return dirSize(o);if(r.isFile()){let{size:e}=i(o);return e}return 0});return f.flat(1/0).reduce((e,r)=>e+r,0)};export const fileSize=e=>i(e).size;