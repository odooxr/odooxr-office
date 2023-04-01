# -*- coding: utf-8 -*-
#
# This controler will help to render products and documents on 3D viewport.
#

from odoo import http
from odoo.http import request
from odoo.exceptions import AccessError
from odoo.addons.web.controllers.utils import ensure_db


class VROffice(http.Controller):
    @http.route('/xr/office', type='http', auth='user')
    def office(self, **kw):
        ensure_db()
        request.update_env(user=request.session.uid)
        try:
            context = request.env['ir.http'].webclient_rendering_context()
            response = request.render('odooxr-office.office_bootstrap',
                                      qcontext=context)
            response.headers['X-Frame-Options'] = 'DENY'
            return response
        except AccessError:
            return request.redirect('/web/login?error=access')

