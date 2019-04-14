


function renderDirData(dirData) {
    const { ignoreNames } = window.dirData;
    const { children } = dirData;
    const childs = children instanceof Array && children.filter(c => c.type == 'directory' && !ignoreNames.includes(c.name));
    return `<li class="${childs && childs.length ? 'has-children' : ''}"><span class="icon">folder</span> ${dirData.name} 
   ${childs ? `<ul>
    ${childs instanceof Array ? childs.map(renderDirData).join('\n') : ''}
   </ul>`: ''}</li>
    `
}
const root = document.querySelector('#root');
dirData.name='';
root.innerHTML = renderDirData(dirData); 
const parents=Array.from(document.querySelectorAll('.has-children ul'));

for (const parent of parents){
    if(parent.lastElementChild)
    parent.style.setProperty('--y2',Math.round(  parent.lastElementChild.offsetTop+25)+'px');
}