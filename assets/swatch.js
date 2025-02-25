/**
* @param variants
*/
function prepare_variants(variants) {
    var variations = [];
    variants.each(function () {
        variations.push($(this).val());
    });
    return variations;
}
/**
*
*/
function get_variation(all_variants, options) {
    var variations = [];
    options = options.join(',').replace(/"/g, '\\"').replace(/'/g, "\\'");
    variations = $(all_variants).find('option[data-options="' + options + '"]');
    if (variations.length > 0)
        $(all_variants).val(variations.val()).trigger('change');
}
/**
* Check this function
*/
function filter_variants(Product, options, option_current, swatch_index, enable_atc_button) {
    var swatch_type = $('.swatch-type[data-index="' + (swatch_index + 1) + '"]');
    if (typeof Product.variations[option_current] !== 'undefined'){
        change_swatch_variants( swatch_type, Object.keys(Product.variations[option_current]), enable_atc_button );
    }else if (typeof Product.variations[options[0]] !== 'undefined' && typeof Product.variations[options[0]][option_current] !== 'undefined'){
        change_swatch_variants( swatch_type, Product.variations[options[0]][option_current], enable_atc_button );
    }
}
/**
*
*/
function change_swatch_variants(swatch, variants, enable_atc_button) {
    var first_select_value,
        swatch_select = swatch.find('.product-variant option'),
        swatch_radio  = swatch.find('.swatch-variant-value');
    $('.product-variant', swatch).prop('disabled', false);
    swatch_radio.parent().addClass('swatch-disabled');
    // BEGIN_TAG_SELECT
        swatch_select.prop({
            disabled: true,
            checked: false
        });
        swatch_select.each(function(){
            if (variants.indexOf($(this).val()) > -1) {
                $(this).prop('disabled', false);
            }
        });
        first_select_value = swatch_select.filter(':not(:disabled):first').val();
        if (enable_atc_button)
            swatch_select.parent().val(first_select_value).trigger('change');
    // END_TAG_SELECT
    // BEGIN_RADIO_BUTTON
        swatch_radio.prop({
            disabled: true,
            checked: false
        });
        swatch_radio.each(function(i){
            if (variants.indexOf($(this).val()) > -1) {
                $(this).prop('disabled', false);
                $(this).parent().removeClass('swatch-disabled');
            }
        });
        if (enable_atc_button)
            swatch_radio.filter(':not(:disabled):first').trigger('click');
    // END_RADIO_BUTTON
    swatch.prev().find('.choose-option').removeClass('choose-option');
}
function choose_before_option( i ) {
    $('.swatch-type[data-index="'+ i +'"] .swatch-element').on('click', function(){
        var swatch_checkeds = $('.swatch-type[data-index="'+ (i - 1) +'"] input:checked').length;
        var swatch_selects = typeof $('.swatch-type[data-index="'+ (i - 1) +'"] select').val() !== 'undefined' && $('.swatch-type[data-index="'+ (i - 1) +'"] select').val() !== '';
        $('.swatch-type.swatch-elements-wrapper').removeClass('choose-option');
        if (swatch_checkeds === 0 && swatch_selects === false) {
            $('.swatch-type[data-index="'+ (i - 1) +'"] .swatch-elements-wrapper').addClass('choose-option');
        }
    });
}
function you_save(compare_at_price,price){  
    let value = 100 - ((price * 100)/compare_at_price);
    let percent_selector = $('.compare_percent');
    let price_selector = $('.you-save-price .money');
    let you_save = $('.you-save-price');
    if(compare_at_price > price){
        percent_selector.html(" (" + value.toFixed(2) + "%)");
        price_selector.html(Shopify.formatMoney(compare_at_price-price) + " " + Shopify.currency.active);
        you_save.fadeIn(function(){you_save.show();});
    }else{
        you_save.fadeOut(function(){you_save.hide();});
    }
}
var _quantity = $('.product-quantity-wrapper > .quantity'),
    _product_featured = $('.jq-featured-slider'),
    _add_to_cart_value = $('.btn-add-tocart > .btn-money'),
    _add_to_cart_items = $('.btn-add-tocart > .btn-items'),
    _product_options = $('.jq-swatch-element,.jq-product-variant'),
    _current_price = $('.product-price .current-price'),
    _current_compare_price = $('.product-price .compare-price'),
    _choosed_variant = $('.all-variant'),
    _price = $(':selected', _choosed_variant).attr('data-price'),
    _global_variant_compare_at_price = $(':selected', $('.all-variant')).attr('data-compare-at-price') === "" ? "" : Shopify.formatMoney($(':selected', $('.all-variant')).attr('data-compare-at-price'));
// Product Options
_product_options.change(function(){
    var options = prepare_variants($('.jq-product-variant option:selected,.swatch-variant-value:checked'));
    get_variation(_choosed_variant, options);
    $(this).parent().removeClass('choose-option');
    // Filter Variants
    filter_variants(VastaShop.Product.current, options, $(this).val(), parseInt($(this).attr('data-swatch-index')), (options.length == VastaShop.Product.current.options.length) );
    if (options.length === VastaShop.Product.current.options.length) {
        $('.btn-add-tocart').prop('disabled', false);
        $('.product-form-buttons-wrapper,.btn-add-tocart').removeClass('hide');
        $('.btn-choose-variant').addClass('hide');
        enableInputs($('.all-variant option:selected').val());
        if(parseInt(VastaShop.Variables._input_qtd.val()) == 1){
            VastaShop.Variables._bt_minus.attr('disabled','disabled');
        }
    }
    return false;
});
var temp = '$';
// Choosed Variant
_choosed_variant.change(function() {
    var variant_id = $(':selected', this).val();
    var variant_image = $(':selected', this).attr('data-image');
    var variant_price = $(':selected', this).attr('data-price');
    var variant_inventory = parseInt($(':selected', this).attr('data-inventory'));
    var variant_available = $(':selected', this).attr('data-available');
    var variant_compare_at_price = $(':selected', this).attr('data-compare-at-price') === "" ? "" : Shopify.formatMoney(parseInt($(':selected', this).attr('data-compare-at-price')), Shopify.money_format) ;
    var compare_at_price = $(':selected', this).attr('data-compare-at-price') === "" ? "" : parseInt($(':selected', this).attr('data-compare-at-price')) ;
    var slick_slide = $('.product-slider-image-wrapper').filter('[data-src="' + variant_image + '"]');
    _quantity.val( 1 );
    if (slick_slide.length > 0) {
        var slick_index = slick_slide.eq(0).closest('[data-slick-index]').data('slick-index');
        _product_featured.slick('slickGoTo', slick_index);
    }
    variant_price = parseInt(variant_price);
    compare_at_price = parseInt(compare_at_price !== '' ? compare_at_price: 0);
    _current_price.html(Shopify.formatMoney(variant_price));
    _current_compare_price.html(variant_compare_at_price);
    if (variant_price < compare_at_price) {
        _current_compare_price.show();
    } else {
        _current_compare_price.hide();
    }
    _price = $(':selected', _choosed_variant).attr('data-price');
    _add_to_cart_value.html(Shopify.formatMoney(parseInt(_quantity.val()) * _price));
    _quantity.attr('data-max', variant_inventory);
    inventoryControl(variant_id);
    enableInputs(variant_id);
    if (parseInt(_quantity.val()) == 1 ){
        _quantity.siblings('.btn-minus').attr('disabled','disabled');
    }
    quantity = parseInt($('#ProductQuantity').val());
    price    = parseInt($('.product-variant[name="id"] option:selected').data('price'));
    you_save(compare_at_price,parseInt(variant_price));
    if(quantity > 1) {
        $(_add_to_cart_items).html(quantity + " ITEMS")
    } else {
        $(_add_to_cart_items).html(quantity + " ITEM")
    }
    if ('true' === variant_available) {
        $('.product-quantity,#AddToCart').show();
        $('#button-out-of-stock').hide();
    } else {
        $('.product-quantity,#AddToCart').hide();
        $('#button-out-of-stock').show();
    }
  	window.history.replaceState(null, null, '?variant=' + variant_id);
});
$(document).ready(function(){
    $('.swatch-type[data-index="1"] .swatch-element').each(function(){
        if (Object.keys(VastaShop.Product.current.variations).indexOf($(this).attr('data-swatch')) > -1) {
            $(this).removeClass('swatch-disabled').find('input').prop('disabled', false);
        } else {
            $(this).find(".tooltip").remove();
        }
    });
    $('.swatch-type[data-index="1"] .jq-product-variant option').each(function(){
        if (Object.keys(VastaShop.Product.current.variations).indexOf($(this).attr('value')) < 0 && $(this).attr('value') !== '') {
            $(this).prop('disabled', true);
        }
    });
    if (VastaShop.Product.options.length > 0) {
        VastaShop.Product.options.forEach(function(option){
            var productVariation = option.replace(/"/g, '\\"').replace(/'/g, "\\'"); 
            $('.swatch-element[data-swatch="' + productVariation + '"]').trigger('click');
            $('.product-variant option[value="' + productVariation + '"]').parent().val(productVariation.replace(/\\/gi, '')).trigger('change'); 
        });
    }
    if (prepare_variants($('.swatch-variant-value:checked', $('.swatch-element'))).length == VastaShop.Product.current.options.length) {
        _current_price.html(Shopify.formatMoney($(':selected', _choosed_variant).attr('data-price')));
        _current_compare_price.html(_global_variant_compare_at_price);
        _add_to_cart_value.html(Shopify.formatMoney(parseInt(_quantity.val()) * _price));
    }
    $('.modal-close').click(function(){
        $('.modal-container').removeClass('active');
    });
    $(window).click(function(e){
        if (e.target == $('.modal-container').get(0))
        $('.modal-container').removeClass('active');
    });
    for (var i = 2, j = VastaShop.Product.current.options.length+1; i < j; i++) {
        choose_before_option( i );
    }
});