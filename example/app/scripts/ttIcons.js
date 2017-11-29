var ttIcons = (function ($) {

    let ttService = {
        paths: {
            json: './scripts/ttIcons/json/icons.json',
            svg: './scripts/ttIcons/svg/icons.svg'
        },
        getJsonIconList: () => $.get(ttService.paths.json),
        getIconsLibrary: () => $.get(ttService.paths.svg)
    };


    let ttModal = {
        config: {
            title: 'Escolha um ícone',
            closeButton: 'Fechar',
            saveButton: 'Salvar',
            size: 'md',
        },
        getTemplate: () => `
            <div id="tt-icons-modal" class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-${ttModal.config.size}" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title">${ttModal.config.title}</h4>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <ul class="list-unstyled list-inline row">
                                    ${ttModal.config.iconList.map(icon =>
                `
                                        <li class="col-xs-4 col-md-2">
                                            <button class="btn btn-default tt-icon-modal-button" data-name="${icon}" style="height: 85px; margin-bottom: 10px;">
                                                <svg style="max-width: 100%; max-height: 100%;">
                                                    <use xlink:href="#${icon}"></use>
                                                </svg>
                                            </button>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">${ttModal.config.closeButton}</button>
                            <button id="tt-modal-save" type="button" class="btn btn-primary" data-dismiss="modal">${ttModal.config.saveButton}</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
        `,
        el: {
            init: () => {
                ttModal.el.modal = $('#tt-icons-modal');
                ttModal.el.pickerBtns = $('.tt-icon-modal-button');
                ttModal.el.saveBtn = $('#tt-modal-save');
                ttModal.el.iconPicker = $('.tt-icon-picker');
            },
        },
        init: () => {
            ttService.getJsonIconList()
                .done(icons => {
                    ttModal.config.iconList = icons;
                    ttModal.create();
                })
        },
        create: () => {
            ttModal.el.template = ttModal.getTemplate();
            $('body').append(ttModal.el.template);
            ttModal.el.init();
            ttModal.createListeners();
        },
        createListeners: () => {
            ttModal.el.pickerBtns.click(ttModal.chooseIcon);
            ttModal.el.saveBtn.click(ttModal.save);
            ttModal.el.iconPicker.click(ttModal.open);
        },
        chooseIcon: (event) => {

            let el = $(event.target.closest('.tt-icon-modal-button'));
            ttModal.el.pickerBtns.removeClass('active');

            ttModal.currentSelection = el.data('name');
            el.addClass('active');
        },
        open: (event) => {
            ttModal.el.currentButton = $(event.target.closest('.tt-icon-picker'));
            ttModal.el.currentInput = $('#' + ttModal.el.currentButton.data('controls'));
            ttModal.el.modal.modal('show');
        },
        save: () => {
            ttModal.el.currentInput.val(ttModal.currentSelection);
            ttModal.el.currentButton.html(`
            <svg style="max-width: 100%; max-height: 100%;">
                <use xlink:href="#${ttModal.currentSelection}"></use>
            </svg>
            `)
        }
    }



    let ttIcons = {
        init: () => {
            ttModal.init();
            ttIcons.appendIconLibrary();
        },
        el: {
            iconLibrary: $('<div>').addClass('tt-icon-library hidden'),
            body: $('body'),
        },
        appendIconLibrary: () => {
            ttIcons.el.body.append(ttIcons.el.iconLibrary);
            ttService.getIconsLibrary().done(library => $("svg", library).appendTo(ttIcons.el.iconLibrary))
        }
    }

    $(document).ready(() => {
        ttIcons.init();
    })

}(jQuery));

