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
            return 'day'
        case 'month':
            return 'day'
        case 'halfyear':
        case 'year':
            return 'day'
            
    }
}

export function intervalToDisplayFormat(interval)
{
    switch(interval)
    {
        case 'day':
            return { hour: 'HH:00' }
        case 'week':
            return { day: 'dd' }
        case 'month':
            return { day: 'D'}
        case 'halfyear':
            return { month: 'M'}
        case 'year':
            return { month: 'MM'}
    }
}