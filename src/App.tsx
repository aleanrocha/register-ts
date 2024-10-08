import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const schema = z.object({
  firstname: z.string().trim().min(1, 'Campo obrigatório!'),
  lastname: z.string().trim().min(1, 'Campo obrigatório!'),
  email: z.string().trim().email('Email inválido!'),
  company: z.string().trim().min(1, 'Campo obrigatório!'),
  dateOfBirth: z.object({
    day: z.string({ required_error: 'Obrigatório!' }),
    month: z.string({ required_error: 'Obrigatório!' }),
    year: z.string({ required_error: 'Obrigatório!' }),
  }),
})

type formData = z.infer<typeof schema>

export const App = () => {
  const { handleSubmit, register, formState, control } = useForm<formData>({
    resolver: zodResolver(schema),
  })
  const onSubmit = (data: formData) => {
    console.log(data)
    alert(
      `CADASTRADO COM SUCESSO! ${new Date().getFullYear()} \n\r Nome: ${data.firstname} \n\r Sobrenome: ${data.lastname} \n\r E-mail: ${data.email} \n\r Empresa: ${data.company} \n\r Nascimento: ${data.dateOfBirth.day}/${data.dateOfBirth.month}/${data.dateOfBirth.year} \n\r Idade: ${new Date().getFullYear() - +data.dateOfBirth.year} anos.`
    )
  }

  return (
    <main className="bg-zinc-900 text-zinc-50 w-full h-screen flex justify-center items-center p-2">
      <div className="w-full max-w-xl bg-zinc-700 rounded-sm p-4">
        <h1 className="text-2xl font-bold text-center">Registre-se</h1>
        <form
          className="flex flex-col gap-6 mt-8"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>
                Nome:
                <Input
                  type="text"
                  placeholder="Seu nome"
                  {...register('firstname')}
                />
              </Label>
              {formState.errors.firstname?.message && (
                <span className="text-sm text-red-400">
                  {formState.errors.firstname.message}
                </span>
              )}
            </div>

            <div>
              <Label>
                Sobrenome:
                <Input
                  type="text"
                  {...register('lastname')}
                  placeholder="Seu sobrenome"
                />
              </Label>
              {formState.errors.lastname?.message && (
                <span className="text-sm text-red-400">
                  {formState.errors.lastname.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>
                E-mail:
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  {...register('email')}
                />
              </Label>
              {formState.errors.email?.message && (
                <span className="text-sm text-red-400">
                  {formState.errors.email.message}
                </span>
              )}
            </div>

            <div>
              <div>
                <Label>
                  Empresa:
                  <Input
                    type="text"
                    placeholder="Nome da empresa"
                    {...register('company')}
                  />
                </Label>
                {formState.errors.company?.message && (
                  <span className="text-sm text-red-400">
                    {formState.errors.company.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>
                Dia:
                <Controller
                  name="dateOfBirth.day"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array(31)
                          .fill(1)
                          .map((_, index) => {
                            const value = String(index + 1).padStart(2, '0')
                            return (
                              <SelectItem key={String(index + 1)} value={value}>
                                {value}
                              </SelectItem>
                            )
                          })}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Label>
              {formState.errors.dateOfBirth?.day?.message && (
                <span className="text-sm text-red-400">
                  {formState.errors.dateOfBirth?.day.message}
                </span>
              )}
            </div>
            <div>
              <Label>
                Mẽs:
                <Controller
                  name="dateOfBirth.month"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array(12)
                          .fill(1)
                          .map((_, index) => {
                            const value = String(index + 1).padStart(2, '0')
                            return (
                              <SelectItem key={String(index + 1)} value={value}>
                                {value}
                              </SelectItem>
                            )
                          })}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Label>
              {formState.errors.dateOfBirth?.month?.message && (
                <span className="text-sm text-red-400">
                  {formState.errors.dateOfBirth.month.message}
                </span>
              )}
            </div>
            <div>
              <Label>
                Ano:
                <Controller
                  name="dateOfBirth.year"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array(200)
                          .fill(1)
                          .map((_, index) => {
                            const value = String(index + 1901).padStart(2, '0')
                            return (
                              <SelectItem key={String(index + 1)} value={value}>
                                {value}
                              </SelectItem>
                            )
                          })}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Label>
              {formState.errors.dateOfBirth?.year?.message && (
                <span className="text-sm text-red-400">
                  {formState.errors.dateOfBirth?.year.message}
                </span>
              )}
            </div>
          </div>
          <Button type="submit" className="mt-4">
            Registrar
          </Button>
        </form>
      </div>
    </main>
  )
}
