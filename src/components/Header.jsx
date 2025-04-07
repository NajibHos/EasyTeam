import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {

  const { user, userRole, logout } = useAuth();

  return (
    <div className='h-[10vh] md:max-2xl:h-[15vh] w-full
     flex justify-center items-center'>
      <div className='h-full w-[80%] flex justify-between items-center'>
        <div id='Logo'>
          <h2 className='text-2xl md:max-2xl:text-3xl font-semibold
          font-poppins text-zinc-800'>
            <NavLink to='/'>
            <span className='italic'>Easy</span>Team
            </NavLink>
          </h2>
        </div>

        <div className='h-full w-auto flex justify-end items-center
        gap-4 lg:max-2xl:gap-8'>

          {
            user ? (
              userRole === 'Admin' ? (
                <>
                <span className='hidden lg:max-2xl:block'>
                  <NavLink to='/admin/dashboard'>
                  <Button label="Dashboard" size="small"
                  icon='pi pi-home'className="bg-zinc-900 text-white
                  outline-0 border-0" />
                  </NavLink>
                </span>

                <span className='block lg:max-2xl:hidden'>
                   <NavLink to='/admin/dashboard'>
                    <Button  size="small"
                    icon='pi pi-home'className="bg-zinc-900 text-white
                    outline-0 border-0" />
                   </NavLink>
                </span>

                <span className='hidden lg:max-2xl:block'>
                  <NavLink to='/admin/add-task'>
                  <Button label="Add tasks" size="small"
                  icon='pi pi-file-edit'className="bg-zinc-900 text-white
                  outline-0 border-0" />
                  </NavLink>
                 </span>

                 <span className='block lg:max-2xl:hidden'>
                  <NavLink to='/admin/add-task'>
                  <Button  size="small"
                  icon='pi pi-file-edit'className="bg-zinc-900 text-white
                  outline-0 border-0" />
                  </NavLink>
                 </span>

                <span className='hidden lg:max-2xl:block'>
                  <Button label="Log Out" size="small"
                  icon='pi pi-sign-out'className="bg-zinc-900 text-white
                  outline-0 border-0"
                  onClick={logout} />
                </span>

                <span className='block lg:max-2xl:hidden'>
                  <Button size="small"
                  icon='pi pi-sign-out'className="bg-zinc-900 text-white
                  outline-0 border-0 "
                  onClick={logout} />
               </span>

              </>
              ) : userRole === 'Members' ? (
                <>
                      <span className='hidden lg:max-2xl:block'>
                        <NavLink to='/member/dashboard'>
                        <Button label="Dashboard" size="small"
                        icon='pi pi-home'className="bg-zinc-900 text-white
                        outline-0 border-0" />
                        </NavLink>
                      </span>

                      <span className='block lg:max-2xl:hidden'>
                         <NavLink to='/member/dashboard'>
                          <Button  size="small"
                          icon='pi pi-home'className="bg-zinc-900
                           text-white
                          outline-0 border-0" />
                         </NavLink>
                      </span>

                      <span className='hidden lg:max-2xl:block'>
                        <NavLink to='/member/profile'>
                        <Button label="Profile" size="small"
                        icon='pi pi-user-edit'className="bg-zinc-900
                         text-white
                        outline-0 border-0" />
                        </NavLink>
                      </span>

                      <span className='block lg:max-2xl:hidden'>
                        <NavLink to='/member/profile'>
                        <Button size="small"
                        icon='pi pi-user-edit'className="bg-zinc-900
                         text-white
                        outline-0 border-0" />
                        </NavLink>
                      </span>

                      <span className='hidden lg:max-2xl:block'>
                        <Button label="Log Out" size="small"
                        icon='pi pi-sign-out'className="bg-zinc-900
                         text-white
                        outline-0 border-0"
                        onClick={logout}/>
                      </span>

                      <span className='block lg:max-2xl:hidden'>
                        <Button size="small"
                        icon='pi pi-sign-out'className="bg-zinc-900
                         text-white
                        outline-0 border-0"
                        onClick={logout}/>
                      </span>
                    </>
              ) : ''
            ) : (
                           <>
                              <span className='hidden lg:max-2xl:block'>
                                <NavLink to='/login'>
                                <Button label="Log In" size="small"
                                icon='pi pi-sign-in'className="bg-zinc-900
                                 text-white
                                outline-0 border-0 " />
                                </NavLink>
                              </span>

                              <span className='block lg:max-2xl:hidden'>
                                <NavLink to='/login'>
                                <Button  size="small"
                                icon='pi pi-sign-in'className="bg-zinc-900
                                 text-white
                                outline-0 border-0 " />
                                </NavLink>
                              </span>

                              <div>
                                <a
                                href="https://github.com/NajibHos/EasyTeam"
                                target="_blank">
                                  <i className='pi pi-github text-2xl
                                 text-zinc-950 hover:text-zinc-600'></i>
                                   </a>
                              </div>

                           </>
            )

          }

        </div>

      </div>
    </div>
  )
}

export default Header