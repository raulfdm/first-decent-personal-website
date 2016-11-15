       let sections = document.querySelectorAll('.section-js');
       let sectionsObj = {},
           index = 0;

       sections.forEach(sec => sectionsObj[sec.id] = sec.offsetTop);

       //console.log(sectionsObj);

       window.onscroll = function() {
           let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
           scrollPosition += 48;
           for (index in sectionsObj) {
               //console.log(sectionsObj[index],scrollPosition)
               let elementoAtual = sectionsObj[index];
               //let elem = `a[href=#${elementoAtual}]`;
               //console.log(elementoAtual);

               if (elementoAtual <= scrollPosition) {
                   //console.log('chegamos aqui', sectionsObj[index]);
                   document.querySelector('.active').setAttribute('class', ' ');
                   document.querySelector('a[href*=' + index + ']').setAttribute('class', 'active');
               }
           }
       }