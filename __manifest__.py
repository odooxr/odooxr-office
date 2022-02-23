# -*- coding: utf-8 -*-
{
    'name': "Metaverse Office",

    'summary': """Work in the metaverse""",

    'description': """
        All your Odoo forms, reports, lists and more around you.
    """,

    'author': "Cristian S. Rocha",
    'website': "https://github.com/odooxr",

    'category': 'Productivity/Office',
    'license': 'LGPL-3',
    'version': '0.1',

    'installable': True,
    'application': True,

    'depends': ['base', 'odooxr-base'],

    'data': [
        'views/office_templates.xml',
    ],
    'demo': [],
}
