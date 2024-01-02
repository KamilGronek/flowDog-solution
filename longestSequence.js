// 2. Napisz funkcję, która jako argument wejściowy otrzymuje jedną tablicę (tablica może zawierać do 10.000.000 liczb, każda liczba z zakresu od 1 do 1.000.000.000)
//  a jako wynik podaje długość najdłuższego ściśle rosnącego (niekoniecznie ciągłego) podciągu tej tablicy. 
// Przykładowo, dla danych wejściowych: [9, 2, 5, 4, 7, 4, 5, 6, 1, 2, 8, 3] najdłuższy ściśle rosnący podciąg to: [2, 4, 5, 6, 8],
//  czyli prawidłowa odpowiedź to 5. W wersji rozszerzonej zadania funkcja powinna zwracać nie długość najdłuższego ciągu
//  a tablicę zawierającą ten ciąg (czyli w podanym przykładzie tablicę [2,4,5,6,8] 
// - jeśli istnieje więcej niż jeden podciąg o największej długości należy zwrócić dowolny z nich).



function addTabToMatrix(matrix, tab) {
    matrix[tab.reduce((previousValue, currentValue) => previousValue ? previousValue + "," + currentValue : previousValue + currentValue, "")] = tab;
}

function getLongestSequenceTab(tab) {
    if (tab.length < 2)
        return tab;

    let result = [];
    const matrix = {
        [tab[0]]: [tab[0]]
    };

    for (let i = 1; i < tab.length; i++) {
        const tabEl = tab[i];
        for (const matrixTabKey in matrix) {
            const matrixTabEl = matrix[matrixTabKey];
            if (matrixTabEl.length === 1 && matrixTabEl[0] !== tabEl) {
                if (matrixTabEl[0] < tabEl) {
                    matrixTabEl.push(tabEl);
                    delete matrix[matrixTabKey];
                    addTabToMatrix(matrix, matrixTabEl);
                } else {
                    matrix[tabEl] = [tabEl];
                }
                continue;
            }
            for (let j = 0; j < matrixTabEl.length - 1; j++) {
                const currentEl = matrixTabEl[j];
                const j2Next = j + 1;
                const nextEl = matrixTabEl[j2Next];
                if (currentEl < tabEl && tabEl < nextEl) {
                    const copyMatrixTabEl = [
                        ...matrixTabEl.slice(0, j2Next),
                        tabEl
                    ]
                    addTabToMatrix(matrix, copyMatrixTabEl);
                    if (copyMatrixTabEl.length > result.length) {
                        result = copyMatrixTabEl;
                    }
                    break;
                } else if (j2Next === matrixTabEl.length - 1 && matrixTabEl[j2Next] < tabEl) {
                    matrixTabEl.push(tabEl);
                    delete matrix[matrixTabKey];
                    addTabToMatrix(matrix, matrixTabEl);
                    if (matrixTabEl.length > result.length) {
                        result = matrixTabEl;
                    }
                }
            }
        }
    }
    console.log("all pairs: ", matrix)

    return result;
}

function getLongestSequence(tab) {
    return getLongestSequenceTab(tab).length;
}

const tab = [9, 2, 5, 4, 7, 4, 5, 6, 1, 2, 8, 3];

console.log("getLongestSequenceTab:", getLongestSequenceTab(tab));
console.log("getLongestSequence:", getLongestSequence(tab));     