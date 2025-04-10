export function formatDate(dateString) {
        const [day, month, year] = dateString.split('.');
        const date = new Date(`${year}-${month}-${day}`);
        
        return new Intl.DateTimeFormat('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).format(date).replace(' г.', '');
}