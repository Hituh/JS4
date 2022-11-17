var cena_energii = 0.6

function koszt() {
    console.log(this.nazwa + " " + this.cena)
}

class Produkt {
    #intl = new Intl.RelativeTimeFormat('pl')
    constructor(id, nazwa, model, rok_produkcji, cena, energia) {
        for (const [key, value] of Object.entries({ id, nazwa, model, rok_produkcji, cena, energia })) {
            this[key] = value
        }
        this.rok_produkcji = new Date(this.rok_produkcji)
    }

    koszt() {
        return this.cena
    }
    kosztEnergii() {
        return this.energia * cena_energii
    }
    wiekProduktu() {
        return new Date().getFullYear() - this.rok_produkcji.getFullYear()
    }
    wiekProduktuLata() {
        return this.#intl.format(this.wiekProduktu(), 'year').slice(3)
    }
}


// console.log("Wszystkie produkty: ")
// console.log("Produkt 1: " + Produkt1.koszt() + " " + Produkt1.kosztEnergii() + " " + Produkt1.wiekProduktu() + " " + Produkt1.wiekProduktuLata())
// console.log("Produkt 2: " + Produkt2.koszt() + " " + Produkt2.kosztEnergii() + " " + Produkt2.wiekProduktu() + " " + Produkt2.wiekProduktuLata())
// console.log("Produkt 3: " + Produkt3.koszt() + " " + Produkt3.kosztEnergii() + " " + Produkt3.wiekProduktu() + " " + Produkt3.wiekProduktuLata())

class ListaTowarow {
    #produkty = {}
    sprawdzProdukt(id) {
        if(this.#produkty[id] === 'undefined') {  
            console.log("test")
            return false
        }
        else {
            console.log("true")
            return true
        }
    }
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
            throw new Error(`Produkt: ${produkt.id} jest już na liście`)
        }
        else {
            this.#produkty[produkt.id] = produkt
        }
    }
    zmienProdukt(idProduktu, produkt) {
        if (!(idProduktu in this.#produkty)) {
            throw new Error(`Produkt o id: ${idProduktu} nie istnieje`)
        }

        for (const [key, value] of Object.entries(produkt)) {
            this.#produkty[idProduktu][key] = value
        }
    }
    getProduct(id) {
        if (!(id in this.#produkty)) {
            throw new Error(`Produkt o id: ${id} nie istnieje`)
        }
        else {
            return this.#produkty[id]
        }
    }
    getId(nazwa, model) {
        var idProduktu
        for (const id in this.#produkty) {
            if (this.#produkty[id].nazwa === nazwa)
                idProduktu = this.#produkty[id].id
        }
        return idProduktu
    }
}

class Magazyn extends ListaTowarow {
    #iloscprodoktow = {}

    wypiszProdukt(id) {
        console.log(`Ilosc prodoktow o id ${id} = ${this.#iloscprodoktow[id]}`)
    }

    wypiszWszystkieProdukty() {
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
            throw new Error(`Produkt o id: ${id} nie istnieje`)
        }
        else {
            this.#iloscprodoktow[id] -= 1
        }
        return produkt
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
            return this.dodajProdukt((new Date().valueOf()), ...args);
        }
        if (args.length === 5) {
            const [id, nazwa, model, cena, energia] = args
            const produkt = new Produkt(id, nazwa, model, new Date(), cena, energia)
            return super.dodajProdukt(produkt)
        }
        throw new Error('Nieprawiłowa ilość argumentów')
    }
    wypiszProdukty() {
        return super.wypiszWszystkieProdukty()
    }
}

var Produkt1 = new Produkt(0, "nazwa1", "model1", '1990-03-02', 2000, 200)
var Produkt2 = new Produkt(1, "nazwa2", "model2", '1992-03-02', 20300, 2003)
var Produkt3 = new Produkt(2, "nazwa3", "model3", '1942-03-02', 200, 2)

var sklep = new Sklep()
var magazyn = new Magazyn()
magazyn.dodajProdukt(Produkt1, 2)
magazyn.dodajProdukt(Produkt2, 17)
magazyn.zabierzProdukt(0)
magazyn.zabierzProdukt("nazwa1", "model1")
magazyn.wypiszWszystkieProdukty()
sklep.dodajProdukt('nazwa5', 'model5', 333, 11)
sklep.dodajProdukt(2, 'nazwa4', 'model4', 2020, 100)
sklep.wypiszProdukty()
