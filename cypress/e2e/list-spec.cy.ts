

describe('list tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/list')
    })

    it('should button disabled if input is empty', () => {

        cy.get('input').should('be.empty')
        cy.get('[data-testid ="button-class"]').each(($button, index) => {

            if (index === 2 || index === 3) {
                cy.get($button).should('not.be.disabled')
            } else {
                cy.get($button).should('be.disabled')
            }
        })
    })

    const randomArray: string[] = [];
    const changingColor = 'rgb(210, 82, 225)';
    const defaultColor = 'rgb(0, 50, 255)';
    const modifiedColor = 'rgb(127, 224, 81)';

    it('should correct render default list', () => {


        cy.get('[data-testid=circle]').should('have.length', 5)

        cy.get('[data-testid ="letter"]').each(($letter, index) => {
            randomArray[index] = $letter.text()
        })

        cy.get('[data-testid=circle]').each(($letter, index) => {

            cy.get($letter).should('have.text', randomArray[index])
            cy.get($letter).should('have.css', 'border-color', defaultColor)

        })

        cy.get('[data-testid=head]').each(($head, index) => {
            if (index === 0) {
                cy.get($head).should('have.text', 'head')
            }
            else {
                cy.get($head).should('not.have.text')
            }
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            if (index === randomArray.length - 1) {
                cy.get($tail).should('have.text', 'tail')
            }
            else {
                cy.get($tail).should('not.have.text')
            }
        })



    })
    it('should correct add to head', () => {

        let inputValue = 5;

        cy.clock()

        cy.get('[placeholder="Введите число"]').type(inputValue)
        cy.get('button').contains('Добавить в head').click()


        cy.get('[data-testid=circle]').should('have.length', 6)


        cy.get('[data-testid ="letter"]').each(($letter, index) => {
            randomArray[index] = $letter.text()
        })

        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === 0) {
                cy.get($letter).should('have.text', inputValue)
                cy.get($letter).should('have.css', 'border-color', changingColor)
                cy.get($letter).should('have.css', 'width', '56px')
            } else {
                cy.get($letter).should('have.text', randomArray[index])
                cy.get($letter).should('have.css', 'border-color', defaultColor)
                cy.get($letter).should('have.css', 'width', '80px')
            }

        })

        cy.get('[data-testid=head]').each(($head) => {
            cy.get($head).should('not.have.text')
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            if (index === randomArray.length - 1) {
                cy.get($tail).should('have.text', 'tail')
            }
            else {
                cy.get($tail).should('not.have.text')
            }
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            if (index === 0) {
                cy.get($bottomIndex).should('not.have.text')
            } else {
                cy.get($bottomIndex).should('have.text', index - 1)
            }
        })

        cy.tick(500)

        cy.get('[data-testid=circle]').should('have.length', 6)


        cy.get('[data-testid ="letter"]').each(($letter, index) => {
            randomArray[index] = $letter.text()
        })


        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === 0) {
                cy.get($letter).should('have.css', 'border-color', modifiedColor)

            } else {
                cy.get($letter).should('have.css', 'border-color', defaultColor)
            }

            cy.get($letter).should('have.text', randomArray[index])
            cy.get($letter).should('have.css', 'width', '80px')
        })

        cy.get('[data-testid=head]').each(($head, index) => {
            if (index === 0) {
                cy.get($head).should('have.text', 'head')
            } else {
                cy.get($head).should('not.have.text')
            }
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            if (index === randomArray.length - 1) {
                cy.get($tail).should('have.text', 'tail')
            }
            else {
                cy.get($tail).should('not.have.text')
            }
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            cy.get($bottomIndex).should('have.text', index)
        })


        cy.tick(500)

        cy.get('[data-testid=circle]').each(($letter) => {
            cy.get($letter).should('have.css', 'border-color', defaultColor)
        })

        cy.get('[placeholder="Введите число"]').should('be.empty')

    })
    it('should correct add to tail', () => {

        let inputValue = 5;

        cy.clock()

        cy.get('[placeholder="Введите число"]').type(inputValue)
        cy.get('button').contains('Добавить в tail').click()


        cy.get('[data-testid=circle]').should('have.length', 6)


        cy.get('[data-testid ="letter"]').each(($letter, index) => {
            randomArray[index] = $letter.text()
        })

        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === randomArray.length - 1) {
                cy.get($letter).should('have.text', inputValue)
                cy.get($letter).should('have.css', 'border-color', changingColor)
                cy.get($letter).should('have.css', 'width', '56px')
            } else {
                cy.get($letter).should('have.text', randomArray[index])
                cy.get($letter).should('have.css', 'border-color', defaultColor)
                cy.get($letter).should('have.css', 'width', '80px')
            }

        })

        cy.get('[data-testid=head]').each(($head, index) => {
            if (index === 0) {
                cy.get($head).should('have.text', 'head')
            } else {
                cy.get($head).should('not.have.text')
            }
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            cy.get($tail).should('not.have.text')
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            if (index === randomArray.length - 1) {
                cy.get($bottomIndex).should('not.have.text')
            } else {
                cy.get($bottomIndex).should('have.text', index)
            }
        })

        cy.tick(500)

        cy.get('[data-testid=circle]').should('have.length', 6)


        cy.get('[data-testid ="letter"]').each(($letter, index) => {
            randomArray[index] = $letter.text()
        })


        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === randomArray.length - 1) {
                cy.get($letter).should('have.css', 'border-color', modifiedColor)

            } else {
                cy.get($letter).should('have.css', 'border-color', defaultColor)
            }

            cy.get($letter).should('have.text', randomArray[index])
            cy.get($letter).should('have.css', 'width', '80px')
        })

        cy.get('[data-testid=head]').each(($head, index) => {
            if (index === 0) {
                cy.get($head).should('have.text', 'head')
            } else {
                cy.get($head).should('not.have.text')
            }
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            if (index === randomArray.length - 1) {
                cy.get($tail).should('have.text', 'tail')
            }
            else {
                cy.get($tail).should('not.have.text')
            }
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            cy.get($bottomIndex).should('have.text', index)
        })


        cy.tick(500)

        cy.get('[data-testid=circle]').each(($letter, index) => {
            cy.get($letter).should('have.css', 'border-color', defaultColor)
        })

        cy.get('[placeholder="Введите число"]').should('be.empty')

    })
    it('should correct add to head by index', () => {

        let inputValue = 5;
        let inputIndexValue = 0;

        cy.clock()

        cy.get('[placeholder="Введите число"]').type(inputValue)
        cy.get('[placeholder="Введите индекс"]').type(inputIndexValue)
        cy.get('button').contains('Добавить по индексу').click()


        cy.get('[data-testid=circle]').should('have.length', 6)


        cy.get('[data-testid ="letter"]').each(($letter, index) => {
            randomArray[index] = $letter.text()
        })

        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === 0) {
                cy.get($letter).should('have.text', inputValue)
                cy.get($letter).should('have.css', 'border-color', changingColor)
                cy.get($letter).should('have.css', 'width', '56px')
            } else {
                cy.get($letter).should('have.text', randomArray[index])
                cy.get($letter).should('have.css', 'border-color', defaultColor)
                cy.get($letter).should('have.css', 'width', '80px')
            }

        })

        cy.get('[data-testid=head]').each(($head) => {
            cy.get($head).should('not.have.text')
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            if (index === randomArray.length - 1) {
                cy.get($tail).should('have.text', 'tail')
            }
            else {
                cy.get($tail).should('not.have.text')
            }
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            if (index === 0) {
                cy.get($bottomIndex).should('not.have.text')
            } else {
                cy.get($bottomIndex).should('have.text', index - 1)
            }
        })

        cy.tick(1000)

        cy.get('[data-testid=circle]').should('have.length', 6)


        cy.get('[data-testid ="letter"]').each(($letter, index) => {
            randomArray[index] = $letter.text()
        })


        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === 0) {
                cy.get($letter).should('have.css', 'border-color', modifiedColor)

            } else {
                cy.get($letter).should('have.css', 'border-color', defaultColor)
            }

            cy.get($letter).should('have.text', randomArray[index])
            cy.get($letter).should('have.css', 'width', '80px')
        })

        cy.get('[data-testid=head]').each(($head, index) => {
            if (index === 0) {
                cy.get($head).should('have.text', 'head')
            } else {
                cy.get($head).should('not.have.text')
            }
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            if (index === randomArray.length - 1) {
                cy.get($tail).should('have.text', 'tail')
            }
            else {
                cy.get($tail).should('not.have.text')
            }
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            cy.get($bottomIndex).should('have.text', index)
        })


        cy.tick(1000)

        cy.get('[data-testid=circle]').each(($letter) => {
            cy.get($letter).should('have.css', 'border-color', defaultColor)
        })

        cy.get('[placeholder="Введите число"]').should('be.empty')
        cy.get('[placeholder="Введите индекс"]').should('be.empty')

    })
    it('should correct remove from head', () => {

        cy.clock()
        cy.get('button').contains('Удалить из head').click()

        cy.get('[data-testid=circle]').should('have.length', 6)


        cy.get('[data-testid ="letter"]').each(($letter, index) => {
            randomArray[index] = $letter.text()
        })

        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === 0) {
                cy.get($letter).should('have.text', randomArray[index])
                cy.get($letter).should('have.css', 'border-color', changingColor)
                cy.get($letter).should('have.css', 'width', '56px')
            } else if (index === 1) {
                cy.get($letter).should('not.have.text')
                cy.get($letter).should('have.css', 'border-color', defaultColor)
                cy.get($letter).should('have.css', 'width', '80px')
            }
            else {
                cy.get($letter).should('have.text', randomArray[index])
                cy.get($letter).should('have.css', 'border-color', defaultColor)
                cy.get($letter).should('have.css', 'width', '80px')
            }

        })

        cy.get('[data-testid=head]').each(($head) => {
            cy.get($head).should('not.have.text')
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            if (index === randomArray.length - 1) {
                cy.get($tail).should('have.text', 'tail')
            }
            else {
                cy.get($tail).should('not.have.text')
            }
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            if (index === 0) {
                cy.get($bottomIndex).should('not.have.text')
            } else {
                cy.get($bottomIndex).should('have.text', index - 1)
            }
        })

        cy.tick(1000)

        cy.get('[data-testid=circle]').should('have.length', 4)

        cy.get('[data-testid ="letter"]').each(($letter, index) => {
            randomArray[index] = $letter.text()
        })

        cy.get('[data-testid=circle]').each(($letter, index) => {
            cy.get($letter).should('have.text', randomArray[index])
            cy.get($letter).should('have.css', 'width', '80px')
            cy.get($letter).should('have.css', 'border-color', defaultColor)
        })


        cy.get('[data-testid=head]').each(($head, index) => {
            if (index === 0) {
                cy.get($head).should('have.text', 'head')
            } else {
                cy.get($head).should('not.have.text')
            }
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            if (index === randomArray.length - 1) {
                cy.get($tail).should('have.text', 'tail')
            }
            else {
                cy.get($tail).should('not.have.text')
            }
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            cy.get($bottomIndex).should('have.text', index)
        })

    })
    it('should correct remove from tail', () => {

        cy.clock()
        cy.get('button').contains('Удалить из tail').click()

        cy.get('[data-testid=circle]').should('have.length', 6)


        cy.get('[data-testid ="letter"]').each(($letter, index) => {
            randomArray[index] = $letter.text()
        })

        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === randomArray.length - 1) {
                cy.get($letter).should('have.text', randomArray[index])
                cy.get($letter).should('have.css', 'border-color', changingColor)
                cy.get($letter).should('have.css', 'width', '56px')
            } else if (index === randomArray.length - 2) {
                cy.get($letter).should('not.have.text')
                cy.get($letter).should('have.css', 'border-color', defaultColor)
                cy.get($letter).should('have.css', 'width', '80px')
            }
            else {
                cy.get($letter).should('have.text', randomArray[index])
                cy.get($letter).should('have.css', 'border-color', defaultColor)
                cy.get($letter).should('have.css', 'width', '80px')
            }

        })

        cy.get('[data-testid=head]').each(($head, index) => {
            if (index === 0) {
                cy.get($head).should('have.text', 'head')
            } else {
                cy.get($head).should('not.have.text')
            }
        })

        cy.get('[data-testid=tail]').each(($tail) => { 
                cy.get($tail).should('not.have.text')
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            if (index === randomArray.length-1) {
                cy.get($bottomIndex).should('not.have.text')
            } else {
                cy.get($bottomIndex).should('have.text', index)
            }
        })

         cy.tick(1000)

          cy.get('[data-testid=circle]').should('have.length', 4)

        cy.get('[data-testid ="letter"]').each(($letter, index) => {
            randomArray[index] = $letter.text()
        })

         cy.get('[data-testid=circle]').each(($letter, index) => {
            cy.get($letter).should('have.text', randomArray[index])
            cy.get($letter).should('have.css', 'width', '80px')
            cy.get($letter).should('have.css', 'border-color', defaultColor)
        })


        cy.get('[data-testid=head]').each(($head, index) => {
            if (index === 0) {
                cy.get($head).should('have.text', 'head')
            } else {
                cy.get($head).should('not.have.text')
            }
        })

        cy.get('[data-testid=tail]').each(($tail, index) => {
            if (index === randomArray.length - 1) {
                cy.get($tail).should('have.text', 'tail')
            }
            else {
                cy.get($tail).should('not.have.text')
            }
        })

        cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
            cy.get($bottomIndex).should('have.text', index)
        })

    })
    it('should correct remove from tail by index', () => {

        let inputIndexValue = 0
        cy.clock()
        cy.get('[placeholder="Введите индекс"]').type(inputIndexValue)
        cy.get('button').contains('Удалить по индексу').click()
        cy.tick(1000)
        cy.get('[data-testid=circle]').should('have.length', 6)


        cy.get('[data-testid ="letter"]').each(($letter, index) => {
            randomArray[index] = $letter.text()
        })

        cy.get('[data-testid=circle]').each(($letter, index) => {
            if (index === 1) {
                cy.get($letter).should('have.text', inputIndexValue)
                cy.get($letter).should('have.css', 'border-color', changingColor)
                cy.get($letter).should('have.css', 'width', '56px')
            } else if (index === 0) {
                cy.get($letter).should('not.have.text')
                cy.get($letter).should('have.css', 'border-color', changingColor)
                cy.get($letter).should('have.css', 'width', '80px')
            }
            else {
                cy.get($letter).should('have.text', randomArray[index])
                cy.get($letter).should('have.css', 'border-color', defaultColor)
                cy.get($letter).should('have.css', 'width', '80px')
            }

        })

            cy.get('[data-testid=head]').each(($head, index) => {
                if(index === 0){
                    cy.get($head).should('have.text', 'head')
                }else{
                    cy.get($head).should('not.have.text')
                }
                
            })

            cy.get('[data-testid=tail]').each(($tail, index) => {
                if (index === randomArray.length - 1) {
                    cy.get($tail).should('have.text', 'tail')
                }
                else {
                    cy.get($tail).should('not.have.text')
                }
            })

            cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
                if (index === 0) {
                    cy.get($bottomIndex).should('have.text', index)
                }
                else if (index === 1) {
                    cy.get($bottomIndex).should('not.have.text')
                } else {
                    cy.get($bottomIndex).should('have.text', index-1)
                }
            })

             cy.tick(2000)

             cy.get('[data-testid=circle]').should('have.length', 4)

            cy.get('[data-testid ="letter"]').each(($letter, index) => {
                randomArray[index] = $letter.text()
            })

            cy.get('[data-testid=circle]').each(($letter, index) => {
                cy.get($letter).should('have.text', randomArray[index])
                cy.get($letter).should('have.css', 'width', '80px')
                cy.get($letter).should('have.css', 'border-color', defaultColor)
            })


            cy.get('[data-testid=head]').each(($head, index) => {
                if (index === 0) {
                    cy.get($head).should('have.text', 'head')
                } else {
                    cy.get($head).should('not.have.text')
                }
            })

            cy.get('[data-testid=tail]').each(($tail, index) => {
                if (index === randomArray.length - 1) {
                    cy.get($tail).should('have.text', 'tail')
                }
                else {
                    cy.get($tail).should('not.have.text')
                }
            })

            cy.get('[data-testid=bottom-index]').each(($bottomIndex, index) => {
                cy.get($bottomIndex).should('have.text', index)
            })
    })

})






