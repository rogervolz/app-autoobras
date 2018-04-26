export const NavBarIcons = {
   computed:{
      menuItems () {
        var menuItems= []
        if(this.userIsAuthenticated ) {
                  console.log('Header.vue - user EXISTE', this.$store.getters.user)
          menuItems=[
          {icon: 'dashboard', title: 'App', link:'/app'},
          {icon: 'build', title: 'Rádio Peão', link:'/radiopeao'},
          {icon: 'note_add', title: 'Diário de Obra', link:'/diario'},
          {icon: 'attach_money', title: 'Financeiro', link:'/financeiro'},
          {icon: 'date_range', title: 'agenda', link:'/agenda'},
          {icon: 'person', title: 'Perfil', link:'/profile'}
          ]
        } else{
                  console.log('Header.vue - user NÃO existe', this.$store.getters.user)
          menuItems= [
          {icon: 'assignment_ind', title: 'Inscreva-se', link:'/signup'},
          {icon: 'lock_open', title: 'Entrar', link:'/signin'}
        ]
        }
        return menuItems
      }
    }
  }
