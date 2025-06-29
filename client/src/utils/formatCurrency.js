export default function formatVND(price) {
  if (typeof price !== 'number') {
    price = parseFloat(price);
  }

  if (isNaN(price)) {
    return '0 ₫';
  }

  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });
}