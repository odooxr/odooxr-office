// <a-plane position="0 0 -0.5" width="0.5" height="0.5" visible="true" id="menu_plane"></a-plane> 

function draw_menu_plane(name, n_items, font_size, left_pos, width) {
  let menu_plane = document.createElement('a-plane');
  menu_plane.setAttribute('id', `menu_${name}`);
  menu_plane.setAttribute('width', `${width}`);
  menu_plane.setAttribute('height', `${n_items*font_size}`);
  menu_plane.setAttribute('visible', true);
  menu_plane.setAttribute('position', `${left_pos} 0 -0.5`);
  return menu_plane
}


function draw_options(menu_plane, menu, child_id, order, bottom_pos, font_size) {
  let option = document.createElement('a-entity');
  let child_name = menu[child_id].name;
  option.setAttribute(`text__${child_name.toLowerCase().replaceAll(' ', '_').replaceAll('&', '').replaceAll('/', '')}`, `align:  center;  color:  #d81313;  value:  ${child_name}`);
  option.setAttribute('position', `0 ${bottom_pos+font_size*order} 0`);
  return option;
}


function draw_menu(menues, menu_id, parent_node, font_size, left_pos, width) {
  let menu = menues[menu_id];
  let menu_plane = draw_menu_plane(menu.name, menu.children.length, font_size, left_pos, width);
  parent_node.appendChild(menu_plane);
  bottom_pos = -(+(menu_plane.attributes.height.value)- font_size) / 2;
  for(var i = 0, size = menu.children.length; i < size ; i++) {
    let option = draw_options(menu_plane, menues, menu.children[i], i, bottom_pos, font_size);
    menu_plane.appendChild(option);
    if (menues[menu.children[i]].children.length > 0) {
      draw_menu(menues, menu.children[i], option, font_size, left_pos + width);
    }
  }
}

function draw_menues(menues, menu_id, control_id) {
  control = document.getElementById(control_id);
  draw_menu(menues, menu_id, control, 0.1, 0, 0.5);
}


odoo.vr_load_menu = (menu_id) => {
  odoo.loadMenusPromise.then((m)=>{
    draw_menues(m, menu_id, 'leftControl');
  })
}

