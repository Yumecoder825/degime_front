(() => {
    window.GetWidgetData = () => [];
    window.SetWidgetData = value => void(0);

    function render() {
        $("#widget-area").children().remove();

        let widgetData = window.GetWidgetData();

        const sync = () => {
            window.SetWidgetData(widgetData);
            render();
        };

        for(let i = 0; i < widgetData.length; i++) {
            let widgetId = "widget-item-" + (i + 1);
            let getToolElement = () => {
                return $("<div>").append(
                    $("<a>").attr({href: "javascript:void(0)"})
                        .click(() => { if(i - 1 < 0) return; widgetData.splice(i - 1, 2, widgetData[i], widgetData[i - 1]); sync(); })
                        .html("<i class=\"fas fa-fw fa-sort-up\"></i>"),
                    $("<a>").attr({href: "javascript:void(0)"})
                        .click(() => { if(i + 1 >= widgetData.length) return; widgetData.splice(i, 2, widgetData[i + 1], widgetData[i]); sync(); })
                        .html("<i class=\"fas fa-fw fa-sort-down\"></i>"),
                    $("<a>").attr({class: "text-danger", href: "javascript:void(0)"})
                        .click(() => { widgetData.splice(i, 1); sync(); }).html("<i class=\"fas fa-fw fa-trash\"></i>"),
                );
            };
            let addWidgetCardElement = label => {
                return $("#widget-area").append(
                    $("<div>").attr({
                        class: "card my-3",
                    }).append(
                        $("<div>").attr({
                            class: "card-body",
                            id: widgetId,
                        }).append(
                            $("<h5>").attr({class: "card-title"}).text(label),
                            getToolElement(),
                        )
                    )
                );
            };

            switch(widgetData[i].type) {
                case "business": {
                    addWidgetCardElement("ビジネスウィジェット");

                    $(`#${widgetId}`).append(
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-company` }).text("会社名（店舗名）"),
                        $("<input>").attr({
                            type: "text",
                            class: "form-control",
                            id: `${widgetId}-company`,
                            value: widgetData[i].company,
                        }).change(e => { widgetData[i].company = e.target.value; sync(); }),
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-role` }).text("役職"),
                        $("<input>").attr({
                            type: "text",
                            class: "form-control",
                            id: `${widgetId}-role`,
                            value: widgetData[i].role,
                        }).change(e => { widgetData[i].role = e.target.value; sync(); }),
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-name` }).text("氏名"),
                        $("<input>").attr({
                            type: "text",
                            class: "form-control",
                            id: `${widgetId}-name`,
                            value: widgetData[i].name,
                        }).change(e => { widgetData[i].name = e.target.value; sync(); }),
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-address` }).text("住所"),
                        $("<input>").attr({
                            type: "text",
                            class: "form-control",
                            id: `${widgetId}-address`,
                            value: widgetData[i].address,
                        }).change(e => { widgetData[i].address = e.target.value; sync(); }),
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-phone` }).text("電話番号"),
                        $("<input>").attr({
                            type: "tel",
                            class: "form-control",
                            id: `${widgetId}-phone`,
                            value: widgetData[i].phone,
                        }).change(e => { widgetData[i].phone = e.target.value; sync(); }),
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-url` }).text("URL"),
                        $("<input>").attr({
                            type: "url",
                            class: "form-control",
                            id: `${widgetId}-url`,
                            value: widgetData[i].url,
                        }).change(e => { widgetData[i].url = e.target.value; sync(); }),
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-email` }).text("メールアドレス"),
                        $("<input>").attr({
                            type: "email",
                            class: "form-control",
                            id: `${widgetId}-email`,
                            value: widgetData[i].email,
                        }).change(e => { widgetData[i].email = e.target.value; sync(); }),
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-other` }).text("その他"),
                        $("<textarea>").attr({
                            class: "form-control",
                            id: `#${widgetId}-other`,
                        }).html(widgetData[i].other).change(e => { widgetData[i].other = e.target.value; sync(); }),
                    );

                    break;
                }

                case "reserve": {
                    addWidgetCardElement("予約ウィジェット");

                    break;
                }

                case "map": {
                    addWidgetCardElement("マップウィジェット");

                    $(`#${widgetId}`).append(
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-location` }).text("場所"),
                        $("<input>").attr({
                            type: "text",
                            class: "form-control",
                            id: `${widgetId}-location`,
                            value: widgetData[i].location,
                        }),
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-lat` }).text("緯度"),
                        $("<input>").attr({
                            type: "text",
                            class: "form-control",
                            id: `${widgetId}-lat`,
                            value: widgetData[i].lat,
                        }).change(e => { if(e.target.value == widgetData[i].lat) return; widgetData[i].lat = e.target.value; sync(); }),
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-lon` }).text("経度"),
                        $("<input>").attr({
                            type: "text",
                            class: "form-control",
                            id: `${widgetId}-lon`,
                            value: widgetData[i].lon,
                        }).change(e => { if(e.target.value == widgetData[i].lon) return; widgetData[i].lon = e.target.value; sync(); }),
                        $("<div>").attr({class: "mt-4 w-100", style: "min-height: 20rem;", id: `${widgetId}-map`}),
                    );

                    $(`#${widgetId}-map`).locationpicker({
                        inputBinding: {
                            latitudeInput: $(`#${widgetId}-lat`),
                            longitudeInput: $(`#${widgetId}-lon`),
                            locationNameInput: $(`#${widgetId}-location`),
                        },
                        enableAutocomplete: true,
                    });

                    break;
                }

                case "link": {
                    addWidgetCardElement("リンクウィジェット");

                    $(`#${widgetId}`).append(
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-label` }).text("ラベル"),
                        $("<input>").attr({
                            type: "text",
                            class: "form-control",
                            id: `${widgetId}-label`,
                            value: widgetData[i].label,
                        }).change(e => { widgetData[i].label = e.target.value; sync(); }),
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-url` }).text("URL"),
                        $("<input>").attr({
                            type: "text",
                            class: "form-control",
                            id: `${widgetId}-url`,
                            value: widgetData[i].url,
                        }).change(e => { widgetData[i].url = e.target.value; sync(); }),
                    );

                    break;
                }

                case "image": {
                    addWidgetCardElement("画像ウィジェット");

                    $(`#${widgetId}`).append(
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-image` }).text("画像"),
                        $("<input>").attr({
                            type: "file",
                            accept: "image/*",
                            class: "form-control",
                            id: `${widgetId}-image`,
                        }).change(e => {
                            let fileReader = new FileReader();
                            fileReader.addEventListener("load", () => {
                                widgetData[i].image = fileReader.result;
                                sync();
                            });
                            fileReader.readAsDataURL(document.getElementById(`${widgetId}-image`).files[0]);
                        }),
                        $("<img>").attr({
                            src: widgetData[i].image,
                            class: "d-flex img-fluid",
                            style: "margin:1rem auto;",
                            id: `${widgetId}-image-elem`,
                        }),
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-label` }).text("ラベル"),
                        $("<input>").attr({
                            type: "text",
                            class: "form-control",
                            id: `${widgetId}-label`,
                            value: widgetData[i].label,
                        }).change(e => { widgetData[i].label = e.target.value; sync(); }),
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-desc` }).text("説明"),
                        $("<input>").attr({
                            type: "text",
                            class: "form-control",
                            id: `${widgetId}-desc`,
                            value: widgetData[i].desc,
                        }).change(e => { widgetData[i].desc = e.target.value; sync(); }),
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-url` }).text("URL"),
                        $("<input>").attr({
                            type: "text",
                            class: "form-control",
                            id: `${widgetId}-url`,
                            value: widgetData[i].url,
                        }).change(e => { widgetData[i].url = e.target.value; sync(); }),
                    );

                    break;
                }

                case "embed": {
                    addWidgetCardElement("埋め込みウィジェット");

                    $(`#${widgetId}`).append(
                        $("<label>").attr({ class: "mt-2", "for": `${widgetId}-src` }).text("ソース"),
                        $("<input>").attr({
                            type: "text",
                            class: "form-control",
                            id: `${widgetId}-src`,
                            value: widgetData[i].src,
                        }).change(e => { widgetData[i].src = e.target.value; sync(); }),
                    );

                    break;
                }
            }
        }
    }

    function WidgetEditor(selector) {
        window.GetWidgetData = () => { return $(selector).val() == "" ? [] : JSON.parse($(selector).val()) };
        window.SetWidgetData = value => { $(selector).val(JSON.stringify(value)) };

        $("#widget-add").click(() => {
            switch($("#widget-add-item").val()) {
                case "business": {
                    let widgetData = window.GetWidgetData();
                    widgetData.push({
                        type: "business",
                        company: "",
                        role: "",
                        name: "",
                        address: "",
                        phone: "",
                        url: "",
                        email: "",
                        other: "",
                    });
                    window.SetWidgetData(widgetData);

                    break;
                }

                case "reserve": {
                    let widgetData = window.GetWidgetData();
                    widgetData.push({
                        type: "reserve",
                    });
                    window.SetWidgetData(widgetData);

                    break;
                }

                case "map": {
                    let widgetData = window.GetWidgetData();
                    widgetData.push({
                        type: "map",
                        location: "",
                        lat: "",
                        lon: "",
                    });
                    window.SetWidgetData(widgetData);

                    break;
                }

                case "link": {
                    let widgetData = window.GetWidgetData();
                    widgetData.push({
                        type: "link",
                        label: "",
                        url: "",
                    });
                    window.SetWidgetData(widgetData);

                    break;
                }

                case "image": {
                    let widgetData = window.GetWidgetData();
                    widgetData.push({
                        type: "image",
                        image: "",
                        label: "",
                        desc: "",
                        url: "",
                    });
                    window.SetWidgetData(widgetData);

                    break;
                }

                case "embed": {
                    let widgetData = window.GetWidgetData();
                    widgetData.push({
                        type: "embed",
                        src: "",
                    });
                    window.SetWidgetData(widgetData);

                    break;
                }
            }

            render();
        });

        render();
    }

    window.WidgetEditor = WidgetEditor;
})();
