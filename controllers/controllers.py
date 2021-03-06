# -*- coding: utf-8 -*-
#
# This controler will help to render products and documents on 3D viewport.
#

from odoo import http


class VROffice(http.Controller):

    @http.route('/vr/office', website=True, auth='public')
    def saleroom(self, **kw):
        return """
<html>
  <head>
    <meta charset='utf-8'>
    <meta name='viewport'
          content='width=device-width, initial-scale=1, user-scalable=no'>
    <meta name='mobile-web-app-capable' content='yes'>
    <meta name='apple-mobile-web-app-capable' content='yes'>
    <link rel='stylesheet' href='/odooxr-base/static/css/common.css'>

    <title>Office Session</title>
  </head>
  <body id="vr-canvas">
    <header>
      <details open>
        <summary>Office Session</summary>
        <p>
          This sample demonstrates a simple VR Office for Odoo.
          <a class="back" href="/">Website</a>
        </p>
      </details>
    </header>
    <script type="module">
      import {Gltf2Node} from '/odooxr-base/static/src/js/render/nodes/gltf2.js';
      import {SkyboxNode} from '/odooxr-base/static/src/js/render/nodes/skybox.js';
      import {setupScene, initXR} from '/odooxr-base/static/src/js/vr.js';
      setupScene((scene) => {
        let office = new Gltf2Node(
        {url: '/odooxr-office/static/media/gltf/office/office.gltf'});
        scene.addNode(office);
        scene.addNode(new SkyboxNode(
        {url: '/odooxr-base/static/media/textures/milky-way-4k.png'}));
      });
      initXR();
    </script>
  </body>
</html>
    """

