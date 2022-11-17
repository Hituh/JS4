var cena_energii = 0.6

function koszt() {
    console.log(this.nazwa + " " + this.cena)
}

class Produkt {
    #intl = new Intl.RelativeTimeFormat('pl')
    constructor(id, nazwa, model, rok_produkcji, cena, zuzycie_energii) {
        for (const [key, value] of Object.entries({ id, nazwa, model, rok_produkcji, cena, zuzycie_energii})) {
            this[key] = value
        }
        this.rok_produkcji = new Date(this.rok_produkcji)
    }

    koszt() {
        return this.cena
    }
    kosztEnergii() {
        return this.zuzycie_energii * cena_energii
    }
    wiekProduktu() {
        return new Date().getFullYear() - this.rok_produkcji.getFullYear()
    }
    wiekProduktuLata() {
        return this.#intl.format(this.wiekProduktu(), 'year').slice(3)
    }
}



class ListaTowarow {
    #produkty = {}
    // sprawdzProdukt(id) {
    //     if(this.#produkty[id] === 'undefined') {  
    //         console.log("test")
    //         return false
    //     }
    //     else {
    //         console.log("true")
    //         return true
    //     }
    // }
    wypiszProdukt(id) {
        console.log(this.#produkty[id])
    }
    wypiszWszystkieProdukty() {
        for (const id in this.#produkty) {
            this.wypiszProdukt(id)
        }
    }
    dodajProdukt(produkt) {
        if (produkt.id in this.#produkty) {
            throw new Error(`Produkt o id: ${produkt.id} jest już na liście`)
        }
        else {
            this.#produkty[produkt.id] = produkt
        }
    }
    zmienProdukt(idProduktu, produkt) {
        if (!(idProduktu in this.#produkty)) {
            throw new Error(`Produkt o id: ${id} nie jest dostępny`)
        }

        for (const [key, value] of Object.entries(produkt)) {
            this.#produkty[idProduktu][key] = value
        }
    }
    getProduct(id) {
        if (!(id in this.#produkty)) {
            throw new Error(`Produkt o id: ${id} nie jest dostępny`)
        }
        else {
            return this.#produkty[id]
        }
    }
    getId(nazwa, model) {
        var idProduktu
        for (const id in this.#produkty) {
            if (this.#produkty[id].nazwa === nazwa)
                if (this.#produkty[id].model === model)
                    idProduktu = this.#produkty[id].id
        }
        return idProduktu
    }
}

class Magazyn extends ListaTowarow {
    #iloscprodoktow = {}

    wypiszProdukt(id) {
        console.log(`Id: ${id} = ${this.#iloscprodoktow[id]}`)
    }

    wypiszWszystkieProdukty() {
        console.log('\nIlość produktów w magazynie: ')
        for (const id in this.#iloscprodoktow) {
            this.wypiszProdukt(id)
        }
    }

    dodajProdukt(produkt, ilość = 1) {
        try {
            super.dodajProdukt(produkt)
        }
        catch (e) { }
        if (this.#iloscprodoktow[produkt.id] = 0)
            this.#iloscprodoktow[produkt.id] = ilość

        this.#iloscprodoktow[produkt.id] += ilość
    }

    zabierzProdukt() {
        if (arguments.length === 1)
            var id = arguments[0]
        if (arguments.length > 1)
            var id = super.getId(arguments[0], arguments[1])
        const produkt = this.getProduct(id)
        if (this.#iloscprodoktow[id] === 0) {
            throw new Error(`Produkt o id: ${id} nie jest dostępny`)
        }
        else {
            this.#iloscprodoktow[id] -= 1
        }
        return produkt
    }

    sprawdzIlosc() {
        if (arguments.length === 1)
            return this.#iloscprodoktow[arguments[0]]
        if (this.#iloscprodoktow[arguments[0]] < arguments[1]) {
            throw new Error(`Produkt o id: ${arguments[0]} nie jest dostępny w magazynie w ilości ${arguments[1]}`)
        }
    }
}

// console.log("================================")
// var magazyn = new Magazyn()
// magazyn.dodajProdukt(Produkt1, 2)
// magazyn.dodajProdukt(Produkt2, 17)
// magazyn.zabierzProdukt(0)
// magazyn.zabierzProdukt("nazwa1", "model1")
// magazyn.wypiszWszystkieProdukty()



// console.log("================================================")
// magazyn.dodajProdukt(Produkt2, 5)
// magazyn.wypiszWszystkieProdukty()

class Sklep extends ListaTowarow {
    dodajProdukt(...args) {
        if (args.length === 4) {
            const [nazwa, model, cena, energia] = args
            const produkt = new Produkt(new Date().valueOf(), nazwa, model, new Date(), cena, energia)
            return super.dodajProdukt(produkt)
        }
        if (args.length === 5) {
            const [id, nazwa, model, cena, energia] = args
            const produkt = new Produkt(id, nazwa, model, new Date(), cena, energia)
            return super.dodajProdukt(produkt)
        }
        throw new Error('Nieprawiłowa ilość argumentów')
    }
    wypiszProdukty() {
        console.log('\nLista Produktów w sklepie: ')
        return super.wypiszWszystkieProdukty()
    }
}

class Zamowienie {
    #sklep = null
    #magazyn = null
    #iloscprodoktow = {}
    constructor(sklep, magazyn) {
        this.#sklep = sklep
        this.#magazyn = magazyn
    }

    dodajProdukt() {
        if (arguments.length === 1) {
            var id = arguments[0]
            var ilosc = 1

        }

        if (arguments.length > 1) {
            var id = arguments[0]
            var ilosc = arguments[1]

        }
        try {
            this.#sklep.getProduct(id)
                this.#magazyn.getProduct(id)
                    this.#iloscprodoktow[id] ??= 0
                    var temp = this.#iloscprodoktow[id] + ilosc
                    this.#magazyn.sprawdzIlosc(id, temp)
                    if (this.#iloscprodoktow[id] != 0) {
                        console.log(`Zmieniono ilość produktu o id: ${id}, z ${this.#iloscprodoktow[id]} na ${temp} w zamówieniu`)
                    }
                    else console.log(`Dodano produkt o id: ${id} i ilości ${ilosc} do zamówienia`)
                    this.#iloscprodoktow[id] = temp
        } catch (e) {
            console.log(e.message)
        }
    }
    zlozZamowienie() {
        console.log(`\nZłożono zamówienie dla:`)
        for (const [id, ilosc] of Object.entries(this.#iloscprodoktow)) {
            console.log(`Produktu o id: ${id} w ilości ${ilosc}\n`)
            for (var i = 0; i < ilosc; i++) {
                this.#magazyn.zabierzProdukt(id)
            }
        }
    }
}

var produkt1 = new Produkt(0, "nazwa1", "model1", (new Date()), 2000, 200)
var produkt2 = new Produkt(1, "nazwa2", "model2", (new Date()), 20300, 2003)
var produkt3 = new Produkt(2, "nazwa3", "model3", '1970-10-10', 200, 2)

console.log("Wszystkie produkty: ")
console.log("Produkt 1: koszt - " + produkt1.koszt() + " kosztEnergii - " + produkt1.kosztEnergii() + " wiekProduktu - " + produkt1.wiekProduktuLata())
console.log("Produkt 2: koszt - " + produkt2.koszt() + " kosztEnergii - " + produkt2.kosztEnergii() + " wiekProduktu - " + produkt2.wiekProduktuLata())
console.log("Produkt 3: koszt - " + produkt3.koszt() + " kosztEnergii - " + produkt3.kosztEnergii() + " wiekProduktu - " + produkt3.wiekProduktuLata())


var sklep = new Sklep()
var magazyn = new Magazyn()

magazyn.dodajProdukt(produkt1, 2)
magazyn.dodajProdukt(produkt2, 17)
magazyn.dodajProdukt(produkt3, 3)
magazyn.wypiszWszystkieProdukty()

sklep.dodajProdukt('nazwa5', 'model5', 333, 11)
sklep.dodajProdukt(2, 'nazwa4', 'model4', 2020, 100)
sklep.wypiszProdukty()
var zamowienie = new Zamowienie(sklep, magazyn)

console.log(`\nTest zamówień`)
zamowienie.dodajProdukt(2, 4)
zamowienie.dodajProdukt(1, 3)
zamowienie.dodajProdukt(2, 2)
zamowienie.dodajProdukt(2)
zamowienie.dodajProdukt(2, 3)
zamowienie.dodajProdukt(1, 3)

zamowienie.zlozZamowienie()
