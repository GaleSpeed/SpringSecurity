package com.example.sbjpamysql.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private CorsFilter corsFilter;
	
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception{
		return super.authenticationManagerBean();
	}
	
	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	public void configureGlobalSecurity(AuthenticationManagerBuilder auth)
			throws Exception {
		auth.userDetailsService(userDetailsService);
	}
	
	@Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
    }

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		 //http.csrf().disable()
         // Just for laughs, apply OAuth protection to only 2 resources
         //.requestMatchers().antMatchers("/").and()
         //.authorizeRequests()
         //.anyRequest().access("#oauth2.hasScope('read')");
		
		http.addFilterBefore(corsFilter, ChannelProcessingFilter.class);
		
		http
		.csrf().disable()
		.authorizeRequests()
        .antMatchers("/oauth/*").permitAll()
        //.antMatchers("/user-groups/**").hasRole("ADMIN")
        //.antMatchers("/user-groups/**/users/**").hasAnyRole("ADMIN","USER")
        .anyRequest().authenticated();
	}

}
