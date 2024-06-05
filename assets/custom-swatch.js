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

  options = options.join(',');
  variations = $(all_variants).find('option[data-options="' + options + '"]');

  if (variations.length > 0) $(all_variants).val(variations.val()).trigger('change');
}

/**
 * Check this function
 */
function filter_variants(Product, options, option_current, swatch_index, enable_atc_button) {
  var swatch_type = $('.swatch-type[data-index="' + (swatch_index + 1) + '"]');

  if (typeof Product.variations[option_current] !== 'undefined') {
    change_swatch_variants(swatch_type, Object.keys(Product.variations[option_current]), enable_atc_button);
  } else if (typeof Product.variations[options[0]] !== 'undefined' && typeof Product.variations[options[0]][option_current] !== 'undefined') {
    change_swatch_variants(swatch_type, Product.variations[options[0]][option_current], enable_atc_button);
  }
}

/**
 *
 */
function change_swatch_variants(swatch, variants, enable_atc_button) {
  var first_select_value,
    swatch_select = swatch.find('.product-variant option'),
    swatch_radio = swatch.find('.swatch-variant-value');

  $('.product-variant', swatch).prop('disabled', false);
  swatch_radio.parent().addClass('swatch-option-disabled');

  // BEGIN_TAG_SELECT
  swatch_select.prop({
    disabled: true,
    checked: false
  });

  swatch_select.each(function () {
    if (variants.indexOf($(this).val()) > -1) {
      $(this).prop('disabled', false);
    }
  });

  first_select_value = swatch_select.filter(':not(:disabled):first').val();

  if (enable_atc_button) swatch_select.parent().val(first_select_value).trigger('change');
  // END_TAG_SELECT

  // BEGIN_RADIO_BUTTON
  swatch_radio.prop({
    disabled: true
  });

  swatch_radio.each(function (i) {
    if (variants.indexOf($(this).val()) > -1) {
      $(this).prop('disabled', false);
      $(this).parent().removeClass('swatch-option-disabled');
    }
  });

  if (!!$('.swatch-variant-value').filter(':checked').closest('.swatch-option-disabled').length) {
    $('#AddToCart,.product-quantity-wrapper,.atc-new').addClass('disabled-button');
  } else {
    $('#AddToCart,.product-quantity-wrapper,.atc-new').removeClass('disabled-button');
  }

  $('#add-to-cart-error').empty();
  // END_RADIO_BUTTON
  swatch.prev().find('.choose-option').removeClass('choose-option');
  var checkOption = '';
  $('.mineSwatchData .swatch-type').each(function(){
    var getValue = $(this).find('.swatch-variant-value:checked').val();
    if(getValue == undefined){
      $(this).find('.swatch-elements-wrapper').addClass('choose-option');
      checkOption = $(this).data('type');
    }else{
      checkOption = $(this).data('type');
      $(this).find('.swatch-elements-wrapper').removeClass('choose-option');
      $('.'+checkOption+'-btn').hide();
      $('.cstm_'+checkOption+'_chart').html(getValue);
    }
  });
  if(checkOption == 'colour'){
    $('.color-btn').show();
    $('.size-btn').hide();
  }
  else{
    $('.color-btn').hide();
    $('.size-btn').show();
  }
  
}


function choose_before_option(i) {
  $('.swatch-type[data-index="' + i + '"] .swatch-element').on('click', function () {
    var swatch_checkeds = $('.swatch-type[data-index="' + (i - 1) + '"] input:checked').length;
    var swatch_selects = typeof $('.swatch-type[data-index="' + (i - 1) + '"] select').val() !== 'undefined' && $('.swatch-type[data-index="' + (i - 1) + '"] select').val() !== '';
    
    $('.swatch-type.swatch-elements-wrapper').removeClass('choose-option');
    var checkOption = '';
  $('.mineSwatchData .swatch-type').each(function(){
    var getValue = $(this).find('.swatch-variant-value:checked').val();
    if(getValue == undefined){
      $(this).find('.swatch-elements-wrapper').addClass('choose-option');
      checkOption = $(this).data('type');
    }else{
      $(this).find('.swatch-elements-wrapper').removeClass('choose-option');
      $('.'+checkOption+'-btn').hide();
    }
  });
  if(checkOption == 'colour'){
    $('.color-btn').show();
    $('.size-btn').hide();
  }else{
    $('.color-btn').hide();
    $('.size-btn').show();
  }
    if (swatch_checkeds === 0 && swatch_selects === false) {
      $('.swatch-type[data-index="' + (i - 1) + '"] .swatch-elements-wrapper').addClass('choose-option');
    }
  });
}

function you_save(compare_at_price, price) {
  let value = 100 - (price * 100) / compare_at_price;
  let percent_selector = $('.compare_percent');
  let price_selector = $('.you-save-price .money');
  let you_save = $('.you-save-price');

  if (compare_at_price > price) {
    percent_selector.html(' (' + value.toFixed(2) + '%)');
    price_selector.html(Shopify.formatMoney(compare_at_price - price) + ' ' + Shopify.currency.active);
    you_save.fadeIn(function () {
      you_save.show();
    });
  } else {
    you_save.fadeOut(function () {
      you_save.hide();
    });
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
  _global_variant_compare_at_price = $(':selected', $('.all-variant')).attr('data-compare-at-price') === '' ? '' : Shopify.formatMoney($(':selected', $('.all-variant')).attr('data-compare-at-price'));

// Product Options
_product_options.change(function () {
  var options = prepare_variants($('.jq-product-variant option:selected,.swatch-variant-value:checked'));

  get_variation(_choosed_variant, options);

  $(this).parent().removeClass('choose-option');

  // Filter Variants
  filter_variants(VastaShop.Product.current, options, $(this).val(), parseInt($(this).attr('data-swatch-index')), options.length == VastaShop.Product.current.options.length);

  if (options.length === VastaShop.Product.current.options.length) {
    $('.btn-add-tocart').prop('disabled', false);
    $('.product-form-buttons-wrapper,.btn-add-tocart').removeClass('hide');
    $('.btn-choose-variant').addClass('hide');
    enableInputs($('.all-variant option:selected').val());
    if (parseInt(VastaShop.Variables._input_qtd.val()) == 1) {
      VastaShop.Variables._bt_minus.attr('disabled', 'disabled');
    }
  }

  return false;
});

var temp = '${{amount}}';

// Choosed Variant
_choosed_variant.change(function () {
  var variant_id = $(':selected', this).val();
  var variant_image = $(':selected', this).attr('data-image');
  var variant_price = $(':selected', this).attr('data-price');
  var variant_inventory = parseInt($(':selected', this).attr('data-inventory'));
  var variant_available = $(':selected', this).attr('data-available');
  var variant_compare_at_price = $(':selected', this).attr('data-compare-at-price') === '' ? '' : Shopify.formatMoney(parseInt($(':selected', this).attr('data-compare-at-price')), Shopify.money_format);
  var compare_at_price = $(':selected', this).attr('data-compare-at-price') === '' ? '' : parseInt($(':selected', this).attr('data-compare-at-price'));
  var slick_slide = $('.product-slider-image-wrapper').filter('[data-src="' + variant_image + '"]');

  _quantity.val(1);

  if (slick_slide.length > 0) {
    var slick_index = slick_slide.eq(0).closest('[data-slick-index]').data('slick-index');
    console.log(slick_index);
    _product_featured.slick('slickGoTo', slick_index);
  }

  _current_price.html(Shopify.formatMoney(variant_price));
  _current_compare_price.html(variant_compare_at_price);

  _price = $(':selected', _choosed_variant).attr('data-price');

  _add_to_cart_value.html(Shopify.formatMoney(parseInt(_quantity.val()) * _price));

  _quantity.attr('data-max', variant_inventory);
  inventoryControl(variant_id);

  enableInputs(variant_id);

  if (parseInt(_quantity.val()) == 1) {
    _quantity.siblings('.btn-minus').attr('disabled', 'disabled');
  }

  quantity = parseInt($('#ProductQuantity').val());
  price = parseInt($('.product-variant[name="id"] option:selected').data('price'));
  you_save(compare_at_price, parseInt(variant_price));

  if (quantity > 1) {
    $(_add_to_cart_items).html(quantity + ' ITEMS');
  } else {
    $(_add_to_cart_items).html(quantity + ' ITEM');
  }

  if ('true' === variant_available) {
    $('.product-quantity,#AddToCart,.atc-new').show();
    $('#button-out-of-stock,#tabs-button-out-of-stock').hide();
  } else {
    $('.product-quantity,#AddToCart,.atc-new').hide();
    $('#button-out-of-stock,#tabs-button-out-of-stock').show();
  }
});

$(document).ready(function () {
  $('.swatch-type[data-index="1"] .swatch-element').each(function () {
    if (Object.keys(VastaShop.Product.current.variations).indexOf($(this).attr('data-swatch')) > -1) {
      $(this).removeClass('swatch-option-disabled').find('input').prop('disabled', false);
    } else {
      $(this).find('.tooltip').remove();
    }
  });

  $('.swatch-type[data-index="1"] .jq-product-variant option').each(function () {
    if (Object.keys(VastaShop.Product.current.variations).indexOf($(this).attr('value')) < 0 && $(this).attr('value') !== '') {
      $(this).prop('disabled', true);
    }
  });

  var a = '';
  $('.swatch-standard .swatch-type').each(function(){
    a += $(this).find('.swatch-elements-options input[type="radio"]:checked').val() + ' / ';
  });

  if (VastaShop.Product.current.variants.length == 1) {
    $('.cart-icon.btn-add-tocart').prop('disabled', false);
    $('.cart-icon.btn-add-tocart').show();
    //  $(".btn.size-btn").hide();
  } else if(a.indexOf('undefined') <= -1){
    $('.cart-icon.btn-add-tocart').prop('disabled', false);
    $('.cart-icon.btn-add-tocart').show();
    $('.color-btn').hide();
    $('.size-btn').addClass('hide');
  }else {
    $('.btn-add-tocart:not([name="checkout"])').prop('disabled', true);
    $('.cart-icon.btn-add-tocart:not([name="checkout"])').hide();
  }

  if (prepare_variants($('.swatch-variant-value:checked', $('.swatch-element'))).length == VastaShop.Product.current.options.length) {
    _current_price.html(Shopify.formatMoney($(':selected', _choosed_variant).attr('data-price')));
    _current_compare_price.html(_global_variant_compare_at_price);

    _add_to_cart_value.html(Shopify.formatMoney(parseInt(_quantity.val()) * _price));
  }

  $('.modal-close').click(function () {
    $('.modal-container').removeClass('active');
  });

  $(window).click(function (e) {
    if (e.target == $('.modal-container').get(0)) $('.modal-container').removeClass('active');
  });

  for (var i = 2, j = VastaShop.Product.current.options.length + 1; i < j; i++) {
    choose_before_option(i);
  }
});

$('.btn.color-btn').click(function () {
    let firstOption = document.querySelector('.swatch-type[data-type="colour"] .swatch-elements-wrapper')
    firstOption.classList.add('choose-option')
    firstOption.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});
$('.sec-btn').click(function () {
  // alert("test");
  $('html, body').animate(
    {
      scrollTop: $('.swatch-type[data-index="2"] ').offset().top - 200
    },
    100
  );
});
$('.btn.size-btn').click(function () {
    let [firstOption, secondOption] = document.querySelectorAll('.swatch-type[data-type="size"] .swatch-elements-wrapper')
    firstOption.classList.remove('choose-option')
    secondOption.classList.add('choose-option')
    secondOption.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    })
});

$('.swatch-type[data-type="size"] .swatch-element').click(function () {
  $(this).parent('.swatch-elements-wrapper').removeClass('choose-option');
  $(this).parents('.products-info').find('.btn.size-btn').addClass('hide');
});

$(document).ready(function () {
  $('#Sticker').find('.swatch-element:first').trigger('click');
});

$(document).ready(function () {
  var color = jQuery('.product-slider-thumbnails .slick-active').find('img').data('source');
  $('.swatch')
    .find('.swatch-element[data-swatchv="' + color + '"]')
    .trigger('click');
});

// When thumbnil clike, color swatch change
$('.product-slider-thumbnails').on('afterChange', function (event, slick, currentSlide) {
  var color = jQuery('.product-slider-thumbnails').find('.slick-current').find('img').data('source');
  $('.swatch')
    .find('.swatch-element[data-swatchv="' + color + '"]')
    .trigger('click');
});

$(document).on('click', '.swatch-element.swatch-colour', function (e) {
  var varntimg = $(this).data('swatchv');
  $('.product-slider-thumbnails')
    .find('img[data-source="' + varntimg + '"]')
    .trigger('click');
});

$(document).ready(function () {
  $('#shopify-section-product-tabs').append($('.secondatc'));
  $('.secondatc').show();
  (function () {
    if (window.isGiftCard) document.querySelectorAll('.swatch-type .swatch-element:first-child').forEach((e) => e.click());
  })();
});

    $(document).ready(function(){
        // Listen for change on radio inputs
        $('.swatch-element-standard input[type="radio"]').change(function(){
            // Check if any radio input is selected
            if ($('.swatch-element-standard input[type="radio"]:checked').length > 0) {
                // Hide the button
                $('.btn.color-btn').hide();
            } else {
                // Show the button if no radio input is selected
                $('.btn.color-btn').show();
            }
        });
    });
