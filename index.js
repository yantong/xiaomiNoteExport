let scroll2 = document.querySelectorAll('div.note-list-items-2ID3T>div>div')[0]
let selDiv = document.querySelectorAll('div.note-list-items-2ID3T>div>div>div')[0]
let count = +selDiv.style.height.replace('px','')/93
let selMsgCount = 0
let allText = ''

function getText() {
    let frame = document.querySelectorAll('iframe#editor_ifr')[0]
    let divs = frame.contentDocument.querySelectorAll('div')
    let text = ''

    for (let index = 0; index < divs.length; index++) {
        const element = divs[index];
        text += element.textContent + '\n'
    }

    return text
}
async function fun() {
    while(1) {
        let button = document.querySelectorAll('div.note-item-35iVX.default-5XLDU')
    
        for (let index = 0; index < button.length; index++) {        
            await new Promise((res,rej) => {
                button = document.querySelectorAll('div.note-item-35iVX.default-5XLDU')
                button[index].click()
                
                setTimeout(() => {
                    let text = getText()
                    
                    if(allText.indexOf(text) < 0)
                    {    
                        allText += selMsgCount + 1 + '\n' + text + '\n\n\n'

                        selMsgCount ++
                    }

                    res()
                }, 800);
            })
        }

        if(scroll2.scrollTop + 93 * button.length + 1 > +selDiv.style.height.replace('px',''))
            break

        await new Promise((res,rej) => {
            scroll2.scrollTop += 93 * button.length

            setTimeout(() => {
                res()
            }, 1000);
        })
        
        
    }  
}

fun().then(() => {
    console.log(allText);
    let filename = `便签.txt`
    let a = document.createElement('a')
    let url = window.URL.createObjectURL(new Blob([allText]))
    
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a) // 下载完成移除元素
})

