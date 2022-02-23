# -*- coding: utf-8 -*-
#
# This controler will help to render products and documents on 3D viewport.
#

from odoo import http
from odoo.http import request
from odoo.exceptions import AccessError
from odoo.addons.web.controllers.main import ensure_db


class VROffice(http.Controller):
    @http.route('/vr/office', type='http', auth='none')
    def office(self, **kw):
        ensure_db()
        if not request.session.uid:
            return request.redirect('/web/login', 303)
        if kw.get('redirect'):
            return request.redirect(kw.get('redirect'), 303)

        request.uid = request.session.uid
        try:
            context = request.env['ir.http'].webclient_rendering_context()
            response = request.render('odooxr-office.office_bootstrap',
                                      qcontext=context)
            response.headers['X-Frame-Options'] = 'DENY'
            return response
        except AccessError:
            return request.redirect('/web/login?error=access')

