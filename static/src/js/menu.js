function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

AFRAME.registerComponent('odoo-menu-option', {
  schema: {
    id: {type: 'string'},
    font_size: {type: 'float', default: 0.1},
    width: {type: 'float', default: 0.5},
    left_pos: {type: 'float', default: 0},
  },
  draw_menu_plane: function (n_items, left_pos) {
    let menu_plane = document.createElement('a-plane');
    menu_plane.setAttribute('id', `menu_${this.data.id}`);
    menu_plane.setAttribute('width', `${this.data.width}`);
    menu_plane.setAttribute('height', `${n_items*this.data.font_size}`);
    menu_plane.setAttribute('visible', 'false');
    menu_plane.setAttribute('position', {x: this.data.left_pos, y: 0, z: -0.2});
    menu_plane.setAttribute('rotation', {x: 0, y: 0, z: 0});
    menu_plane.setAttribute('odoo-menu-section', {
      id: this.data.id,
      font_size: this.data.font_size,
      width: this.data.width,
    });
    menu_plane.setAttribute('hoverable', '');
    menu_plane.setAttribute('grabbable', '');
    menu_plane.setAttribute('stretchable', '');
    menu_plane.setAttribute('draggable', '');
    menu_plane.setAttribute('dropppable', '');

    return menu_plane
  },
  draw_menu: function (left_pos) {
    let menu = this.el.menu_data[this.data.id];
    let menu_plane = this.draw_menu_plane(menu.children.length, left_pos);
    menu_plane.menu_data = this.el.menu_data;
    this.el.appendChild(menu_plane);
    return menu_plane;
  },
  init: function () {
    if (this.el.menu_data[this.data.id].children.length > 0) {
      this.draw_menu(this.data.left_pos, this.data.width);
    }
  },
  play: function () {
    this.el.addEventListener('start-hover', function (event) {
      console.log('Entity start hover');
    });
    this.el.addEventListener('end-hover', function (event) {
      console.log('Entity end hover');
    });        
  }
});


AFRAME.registerComponent('odoo-menu-section', {
  schema: {
    id: {type: 'string'},
    font_size: {type: 'float', default: 0.1},
    width: {type: 'float', default: 0.5},
  },
  draw_options: function(child_id, order, bottom_pos) {
    let option = document.createElement('a-entity');
    let child_name = this.el.menu_data[child_id].name;
    let child_short_name = child_name.toLowerCase().replaceAll(' ', '_').replaceAll('&', '').replaceAll('/', '');
    option.setAttribute(`text__${child_short_name}`, `align:  center;  color:  #d81313;  value:  ${child_name}`);
    option.setAttribute('position', {x: 0, y: bottom_pos+this.data.font_size*order, z: 0});
    option.setAttribute('odoo-menu-option', {
      id: child_id,
      font_size: this.data.font_size,
      width: this.data.width,
      left_pos: this.data.width
    });
    option.setAttribute('hoverable', '');    
    option.addEventListener('start-hover', function (event) {
      console.log('Entity start hover');
    });
    option.addEventListener('end-hover', function (event) {
      console.log('Entity end hover');
    });
    return option;
  },
  init: function () {
    let menu = this.el.menu_data[this.data.id];
    bottom_pos = -(+(this.el.attributes.height.value)- this.data.font_size) / 2;
    for(var i = 0, size = menu.children.length; i < size ; i++) {
      let option = this.draw_options(menu.children[i], i, bottom_pos);
      option.menu_data = this.el.menu_data;
      this.el.appendChild(option);
    };
  }
});


AFRAME.registerComponent('odoo-menu', {
  schema: {
    id: {type: 'string', default: 'root'},
    font_size: {type: 'float', default: 0.1},
    width: {type: 'float', default: 0.5}
  },
  init: function () {
    odoo.loadMenusPromise.then((menu_data)=>{
      console.log("OdooVR-Office: Menu loaded")
      removeAllChildNodes(this.el);
      
      this.el.menu_data = menu_data;

      this.el.setAttribute("odoo-menu-option", this.data)
      
      this.el.addEventListener('buttondown', function(event) {
        let menu = document.getElementById('menu_root');
        menu.setAttribute('visible', 'true')
      })
  
      this.el.addEventListener('buttonup', function(event) {
        let menu = document.getElementById('menu_root');
        menu.setAttribute('visible', 'false')
      })
    });
  }
});


AFRAME.registerComponent('odoo-menu-controller', {
  init: function () {
    odoo.loadMenusPromise.then((menu_data)=>{
      console.log("OdooVR-Office: Menu controller loaded")
    });
  },
  play: function () {
      this.el.addEventListener('start-hover', function (event) {
        console.log('Entity start hover');
      });
      this.el.addEventListener('end-hover', function (event) {
        console.log('Entity end hover');
      });        
  }
});

