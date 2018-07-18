import moment from 'moment'

export function calcInterval( interval, _to ) {    // Пересчитываем to от from или от текущего момента. 
    const to = _to ? _to : new Date()

    switch (interval) {
        case 'day':
            return moment(to).subtract('1','days').toDate()
        case 'week':
            return moment(to).subtract('7','days').toDate()
        case 'month':
            return moment(to).subtract('1','months').toDate()
        case 'halfyear':
            return moment(to).subtract('6','months').toDate()
        case 'year':
            return moment(to).subtract('1','year').toDate()
    }
    throw new Error('Invalid aggregation period')
}

export function intervalToAggregate(interval) {
    switch(interval)
    {
        case 'day':
            return 'hour'
        case 'week':
            return 'hour'
        case 'month':
            return 'day'
        case 'halfyear':
            return 'week'
            
    }

}