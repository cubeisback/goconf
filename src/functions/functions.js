export function formatDate(dateString) {
        const [day, month, year] = dateString.split('.');
        const date = new Date(`${year}-${month}-${day}`);
        
        return new Intl.DateTimeFormat('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).format(date).replace(' г.', '');
}

export function formatPrice(price) {
  const str = String(price).replace(/\D/g, '');
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}